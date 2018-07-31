import { AsyncStorage } from 'react-native';
import TaskEntity from './taskEntity';
import { TaskStore, TaskNotFoundError } from './taskStore';
import * as Config from '../../../../config/config';
import TimeProvider from '../time/timeProvider';

const { KEY_TASKS } = Config.Storage;

export default class TaskStoreImpl implements TaskStore {
  constructor(
    private readonly storage: AsyncStorage,
    private readonly idProvider: TaskStore.IdProvider,
    private readonly timeProvider: TimeProvider,
  ) {}

  public async getTasks(): Promise<Array<TaskEntity>> {
    const json = await this.storage.getItem(KEY_TASKS);
    if (json === null) {
      return [];
    }
    const tasksJson: Array<any> = JSON.parse(json);
    return tasksJson.map(json => new TaskEntity(json));
  }

  public async create(
    title: string,
    description?: string,
  ): Promise<TaskEntity> {
    const newTask = new TaskEntity({
      id: this.idProvider.generateId(),
      title,
      description,
      timestamp: this.timeProvider.currentTimeMillis,
      completed: false,
    });
    const tasks = await this.getTasks();
    tasks.push(newTask);
    await this.storage.setItem(KEY_TASKS, JSON.stringify(tasks));
    return newTask;
  }

  public async update(
    id: string,
    title: string,
    description?: string,
  ): Promise<TaskEntity> {
    const tasks: Array<TaskEntity> = await this.getTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      throw new TaskNotFoundError(id);
    }
    const updatedTask = tasks[taskIndex].copyWith({ title, description });
    tasks[taskIndex] = updatedTask;
    await this.storage.setItem(KEY_TASKS, JSON.stringify(tasks));
    return updatedTask;
  }

  public async active(id: string): Promise<TaskEntity> {
    const tasks: Array<TaskEntity> = await this.getTasks();
    const srcTaskIndex = tasks.findIndex(t => t.id === id);
    if (srcTaskIndex === -1) {
      throw new TaskNotFoundError(id);
    }
    const srcTask = tasks[srcTaskIndex];
    const updatedTask = srcTask.copyWith({ completed: false });
    tasks[srcTaskIndex] = updatedTask;

    await this.storage.setItem(KEY_TASKS, JSON.stringify(tasks));
    return updatedTask;
  }

  public async complete(id: string): Promise<TaskEntity> {
    const tasks: Array<TaskEntity> = await this.getTasks();
    const srcTaskIndex = tasks.findIndex(t => t.id === id);
    if (srcTaskIndex === -1) {
      throw new TaskNotFoundError(id);
    }
    const srcTask = tasks[srcTaskIndex];
    const updatedTask = srcTask.copyWith({ completed: true });
    tasks[srcTaskIndex] = updatedTask;

    await this.storage.setItem(KEY_TASKS, JSON.stringify(tasks));
    return updatedTask;
  }

  public async delete(id: string): Promise<void> {
    const tasks: Array<TaskEntity> = await this.getTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      return;
    }
    tasks.splice(taskIndex, 1);
    await this.storage.setItem(KEY_TASKS, JSON.stringify(tasks));
  }

  public async deleteAll(): Promise<void> {
    await this.storage.removeItem(KEY_TASKS);
  }
}
