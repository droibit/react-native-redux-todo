import { TaskEntity, TaskStore } from "../../source/task";
import TaskRepository from "./taskReposirory";

export default class TaskRepositoryImpl implements TaskRepository {
  constructor(private readonly store: TaskStore) {}

  public getTasks(): Promise<ReadonlyArray<TaskEntity>> {
    return this.store.getTasks();
  }

  public createTask(title: string, description: string): Promise<TaskEntity> {
    return this.store.create(title, description);
  }

  public updateTask(
    taskId: string,
    title: string,
    description: string,
  ): Promise<TaskEntity> {
    return this.store.update(taskId, title, description);
  }

  public activeTask(taskId: string): Promise<TaskEntity> {
    return this.store.active(taskId);
  }

  public completeTask(taskId: string): Promise<TaskEntity> {
    return this.store.complete(taskId);
  }

  public deleteTask(taskId: string): Promise<void> {
    return this.store.delete(taskId);
  }

  public deleteAllTasks(): Promise<void> {
    return this.store.deleteAll();
  }
}
