import TaskEntity from "./taskEntity";
import uuid from "uuid/v4";

export interface TaskStore {

  getTasks(): Promise<ReadonlyArray<TaskEntity>>;

  create(title: string, description?: string): Promise<TaskEntity>;

  update(id: string, title: string, description?: string): Promise<TaskEntity>;

  active(id: string): Promise<TaskEntity>;

  complete(id: string): Promise<TaskEntity>;

  delete(id: string): Promise<void>;

  deleteAll(): Promise<void>;
}

export class TaskNotFoundError extends Error {

  constructor(public readonly taskId: string) {
    super(`Unknown task id: ${taskId}`);
  }
}

export namespace TaskStore {

  export class IdProvider {
    generateId(): string {
      return uuid();
    }
  }
}