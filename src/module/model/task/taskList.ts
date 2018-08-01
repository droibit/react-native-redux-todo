import { List, Map, Record } from "immutable";
import { Task } from "./task";

interface Props {
  src: Map<string, Task>;
}

export class TaskList extends Record({
  src: Map<string, Task>(),
} as Props) {
  private readonly src!: Map<string, Task>;

  constructor(values: Props = { src: Map() }) {
    super(values);
  }

  public get length(): number {
    return this.src.size;
  }

  public get tasks(): List<Task> {
    return List(this.src.valueSeq());
  }

  public getTaskById(id: string): Task | null {
    if (this.src.has(id)) {
      return this.src.get(id);
    }
    return null;
  }

  public addTasks(tasks: Array<Task>): TaskList {
    return this.withMutations(s => {
      let newTasks = s.get("src") as Map<string, Task>;
      for (const task of tasks) {
        newTasks = newTasks.set(task.id, task);
      }
      s.set("src", newTasks);
    }) as TaskList;
  }

  public addTask(task: Task): TaskList {
    return this.withMutations(s => {
      const newTasks = s.get("src").set(task.id, task);
      s.set("src", newTasks);
    }) as TaskList;
  }

  public updateTask(task: Task): TaskList {
    return this.withMutations(s => {
      const src = s.get("src") as Map<string, Task>;
      const newTasks = src.update(task.id, () => task);
      s.set("src", newTasks);
    }) as TaskList;
  }

  public deleteTask(taskId: string): TaskList {
    // if (!this.get("src").has(taskId)) {
    //   return this;
    // }
    return this.withMutations(s => {
      const src = s.get("src") as Map<string, Task>;
      s.set("src", src.remove(taskId));
    }) as TaskList;
  }

  public clearCompletedTasks(): TaskList {
    return this.withMutations(s => {
      const src = s.get("src") as Map<string, Task>;
      const newTasks = src.filterNot((v, k) => (v && v.completed) === true);
      s.set("src", newTasks);
    }) as TaskList;
  }
}
