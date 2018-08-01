import TaskRepository from "../task/taskReposirory";

export const taskRepository: TaskRepository = {
  getTasks: jest.fn(),
  createTask: jest.fn(),
  updateTask: jest.fn(),
  activeTask: jest.fn(),
  completeTask: jest.fn(),
  deleteTask: jest.fn(),
  deleteAllTasks: jest.fn(),
};
