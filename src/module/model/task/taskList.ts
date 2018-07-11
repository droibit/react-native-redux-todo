import { Map, Record, List } from "immutable";
import { Task } from "./task";

// TODO: Suppress tslint error.
export class TaskList extends Record({
  src: Map()
} as TaskList.Props) {

  // private readonly src: Map<String, Task>;

  constructor(values: TaskList.Props) {
    super(values);
  }
  
  public get tasks(): List<Task> {
    let tasks = this.get("src") as Map<String, Task>;
    return List(tasks.values);
  }

  public getTaskById(id: string): Task | null {
    let src = this.get("src") as Map<String, Task>;
    if (src.has(id)) {
      return src.get(id);
    }
    return null;
  }

  public addTask(task: Task): TaskList {
    return this.withMutations(s => {
      let newTasks = s.get("src").set(task.id, task);
      s.set("src", newTasks);
    }) as TaskList;
  }

  public updateTask(task: Task): TaskList {
    return this.withMutations(s => {
      let src = s.get("src") as Map<String, Task>;
      let newTasks = src.update(task.id, () => task);
      s.set("src", newTasks);
    }) as TaskList;
  }

  public deleteTask(taskId: string): TaskList {
    // if (!this.get("src").has(taskId)) {
    //   return this;
    // }
    return this.withMutations(s => {
      let src = s.get("src") as Map<String, Task>;
      s.set("src", src.remove(taskId));
    }) as TaskList;
  }

  public clearCompletedTasks(): TaskList {
    return this.withMutations(s => {
      let src = s.get("src") as Map<String, Task>;
      let newTasks = src.filterNot((v, k) => (v && v.completed) === true);
      s.set("src", newTasks);
    }) as TaskList;
  }
}

export namespace TaskList {

  export type Props = {
    src: Map<String, Task>
  };
}
