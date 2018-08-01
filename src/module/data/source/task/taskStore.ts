import uuid from "uuid/v4";
import TaskEntity from "./taskEntity";

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
  // tslint:disable-next-line
  export class IdProvider {
    public generateId(): string {
      return uuid();
    }
  }
}
