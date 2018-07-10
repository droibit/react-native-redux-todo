import TaskEntity from "./taskEntity";
import uuid from "uuid/v4";

export interface TaskStore {

  getTasks(): Promise<TaskEntity[]>;

  create(title: string, description: string | undefined): Promise<TaskEntity>;

  update(id: string, title: string, description: string | undefined): Promise<boolean>;

  active(id: string): Promise<boolean>;

  complete(id: string): Promise<boolean>;

  delete(id: string): Promise<boolean>;

  deleteAll(): Promise<boolean>;
}

export namespace TaskStore {

  export class IdProvider {
    generateId(): string {
      return uuid();
    }
  }
}