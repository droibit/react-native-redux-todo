import TaskRepository from "./taskReposirory";
import { TaskEntity, TaskStore } from "../../source/task";

export default class TaskRepositoryImpl implements TaskRepository {

  constructor(
    private readonly store: TaskStore,
  ) {
    
  }

  public getTasks(): Promise<TaskEntity[]> {
    return this.store.getTasks();
  }

  public createTask(title: string, description: string | undefined): Promise<TaskEntity> {
    return this.store.create(title, description);
  }

  public updateTask(taskId: string, title: string, description: string | undefined): Promise<boolean> {
    return this.store.update(taskId, title, description);
  }

  public activeTask(taskId: string): Promise<boolean> {
    return this.store.active(taskId);
  }

  public completeTask(taskId: string): Promise<boolean> {
    return this.store.complete(taskId);
  }

  public deleteTask(taskId: string): Promise<boolean> {
    return this.store.delete(taskId);
  }

  public deleteAllTasks(): Promise<boolean> {
    return this.store.deleteAll();
  }
}
