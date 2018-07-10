import TaskEntity from "../../source/task/taskEntity";

export interface TaskRepository {

  getTasks(): Promise<TaskEntity[]>;

  createTask(title: string, description: string | undefined): Promise<TaskEntity>;

  updateTask(taskId: string, title: string, description: string | undefined): Promise<boolean>;

  activeTask(taskId: string): Promise<boolean>;

  completeTask(taskId: string): Promise<boolean>;

  deleteTask(taskId: string): Promise<boolean>;

  deleteAllTasks(): Promise<boolean>;
}