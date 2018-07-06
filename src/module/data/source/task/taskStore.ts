import TaskEntity from "./taskEntity";

export default interface TaskStore {

  getTasks(): Promise<TaskEntity[]>;

  create(task: TaskEntity): Promise<boolean>;

  update(id: string, title: string, description: string | undefined): Promise<boolean>;

  active(id: string): Promise<boolean>;

  complete(id: string): Promise<boolean>;

  delete(id: string): Promise<boolean>;

  deleteAll(): Promise<boolean>;
}