import { TaskRepository } from "./taskReposirory";
import { TaskEntity, TaskStore } from "../../source/task";

export default class TaskRepositoryImpl implements TaskRepository {

  constructor(
    private readonly store: TaskStore
  ) {    
  }

  getTasks(): Promise<TaskEntity[]> {
    return this.store.getTasks();
  }

  createTask(title: string, description: string | undefined): Promise<TaskEntity> {
    return this.store.create(title, description);
  }

  updateTask(taskId: string, title: string, description: string | undefined): Promise<boolean> {
    return this.store.update(taskId, title, description);
  }

  activeTask(taskId: string): Promise<boolean> {
    return this.store.active(taskId);
  }

  completeTask(taskId: string): Promise<boolean> {
    return this.store.complete(taskId);
  }

  deleteTask(taskId: string): Promise<boolean> {
    return this.store.delete(taskId);
  }

  deleteAllTasks(): Promise<boolean> {
    return this.store.deleteAll();
  }
}