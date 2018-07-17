import TaskEntity from "../../source/task/taskEntity";

export default interface TaskRepository {

  getTasks(): Promise<Array<TaskEntity>>;

  createTask(title: string, description?: string): Promise<TaskEntity>;

  updateTask(taskId: string, title: string, description?: string): Promise<boolean>;

  activeTask(taskId: string): Promise<boolean>;

  completeTask(taskId: string): Promise<boolean>;

  deleteTask(taskId: string): Promise<boolean>;

  deleteAllTasks(): Promise<boolean>;
}
