import * as Immutable from "immutable";
import { Task, TaskList } from ".";
import { Result } from "../result";

interface Props {
  tasks: TaskList;
  loadingResult: Result<any>;
  createResult: Result<Task>;
  updateResult: Result<Task>;
  activeResult: Result<Task>;
  completeResult: Result<Task>;
  clearCompletedResult: Result<any>;
  deleteResult: Result<string>;
}

// TODO: Unit test.
export class TaskState extends Immutable.Record({
  tasks: new TaskList(),
  loadingResult: new Result<Task>(),
  createResult: new Result<Task>(),
  updateResult: new Result<Task>(),
  activeResult: new Result<Task>(),
  completeResult: new Result<Task>(),
  clearCompletedResult: {},
  deleteResult: new Result<string>(),
} as Props) {
  public readonly tasks!: TaskList;
  public readonly loadingResult!: Result<void>;
  public readonly createResult!: Result<Task>;
  public readonly updateResult!: Result<Task>;
  public readonly activeResult!: Result<Task>;
  public readonly completeResult!: Result<Task>;
  public readonly clearCompletedResult!: Result<any>;
  public readonly deleteResult!: Result<string>;

  public withTasks(tasks: TaskList): TaskState {
    return this.withMutations(s => {
      s.set(
        "loadingResult",
        new Result<any>({
          inProgress: false,
          data: {},
        }),
      ).set("tasks", tasks);
    }) as TaskState;
  }

  public withLoadingResult(result: Result<any>): TaskState {
    return this.withMutations(s => {
      s.set("loadingResult", result);
    }) as TaskState;
  }

  public withCreateResult(result: Result<Task>): TaskState {
    return this.withMutations(s => {
      this.updateTasksIfNeeded(s, result).set("createResult", result);
    }) as TaskState;
  }

  public withUpdateResult(result: Result<Task>): TaskState {
    return this.withMutations(s => {
      this.updateTasksIfNeeded(s, result).set("updateResult", result);
    }) as TaskState;
  }

  public withActiveResult(result: Result<Task>): TaskState {
    return this.withMutations(s => {
      this.updateTasksIfNeeded(s, result).set("activeResult", result);
    }) as TaskState;
  }

  public withCompleteResult(result: Result<Task>): TaskState {
    return this.withMutations(s => {
      this.updateTasksIfNeeded(s, result).set("completeResult", result);
    }) as TaskState;
  }

  public withClearCompletedResult(result: Result<any>): TaskState {
    return this.withMutations(s => {
      if (result.isSuccess) {
        const tasks = s.get("tasks") as TaskList;
        s.set("tasks", tasks.clearCompletedTasks());
      }
      s.set("clearCompletedResult", result);
    }) as TaskState;
  }

  public withDeleteResult(result: Result<string>): TaskState {
    return this.withMutations(s => {
      if (result.isSuccess) {
        const tasks = s.get("tasks") as TaskList;
        s.set("tasks", tasks.deleteTask(result.data!));
      }
      s.set("deleteResult", result);
    }) as TaskState;
  }

  private updateTasksIfNeeded(
    s: Immutable.Map<string, any>,
    result: Result<Task>,
  ): Immutable.Map<string, any> {
    if (result.isSuccess) {
      const tasks = s.get("tasks") as TaskList;
      s.set("tasks", tasks.updateTask(result.data!));
    }
    return s;
  }
}
