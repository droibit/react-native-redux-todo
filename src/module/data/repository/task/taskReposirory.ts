import TaskEntity from '../../source/task/taskEntity';

export default interface TaskRepository {
  getTasks(): Promise<ReadonlyArray<TaskEntity>>;

  createTask(title: string, description: string): Promise<TaskEntity>;

  updateTask(
    taskId: string,
    title: string,
    description: string,
  ): Promise<TaskEntity>;

  activeTask(taskId: string): Promise<TaskEntity>;

  completeTask(taskId: string): Promise<TaskEntity>;

  deleteTask(taskId: string): Promise<void>;

  deleteAllTasks(): Promise<void>;
}
