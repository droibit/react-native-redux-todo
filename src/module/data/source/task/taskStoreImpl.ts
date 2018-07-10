import { AsyncStorage } from "react-native";
import TaskEntity from "./taskEntity";
import TaskStore from "./taskStore";
import * as Config from "../../../../config/config";

const { KEY_TASKS } = Config.Storage;

export default class TaskStoreImpl implements TaskStore {

  constructor(private storage: AsyncStorage) {
  }

  async getTasks(): Promise<TaskEntity[]> {
    const json = await this.storage.getItem(KEY_TASKS);
    if (json === null) {
      return [];
    }
    const tasksJson: Array<any> = JSON.parse(json);
    return tasksJson.map(json => TaskEntity.fromJson(json));
  }

  async create(task: TaskEntity): Promise<boolean> {
    const tasks = await this.getTasks();
    tasks.push(task);
    await this.storage.setItem(KEY_TASKS, JSON.stringify(tasks));
    return true;
  }

  async update(id: string, title: string, description: string | undefined): Promise<boolean> {
    const tasks: Array<TaskEntity> = await this.getTasks();
    const taskIndex = tasks.findIndex(t => t.id == id);
    if (taskIndex === -1) {
      return false;
    }
    tasks[taskIndex] = tasks[taskIndex].copyWith({ title, description });
    await this.storage.setItem(KEY_TASKS, JSON.stringify(tasks));
    return true;
  }

  async active(id: string): Promise<boolean> {
    const tasks: Array<TaskEntity> = await this.getTasks();
    const taskIndex = tasks.findIndex(t => t.id == id);
    if (taskIndex === -1) {
      return false;
    }
    tasks[taskIndex] = tasks[taskIndex].copyWith({ completed: false });
    await this.storage.setItem(KEY_TASKS, JSON.stringify(tasks));
    return true;
  }

  async complete(id: string): Promise<boolean> {
    const tasks: Array<TaskEntity> = await this.getTasks();
    const taskIndex = tasks.findIndex(t => t.id == id);
    if (taskIndex === -1) {
      return false;
    }
    tasks[taskIndex] = tasks[taskIndex].copyWith({ completed: true });
    await this.storage.setItem(KEY_TASKS, JSON.stringify(tasks));
    return true;
  }

  async delete(id: string): Promise<boolean> {
    const tasks: Array<TaskEntity> = await this.getTasks();
    const taskIndex = tasks.findIndex(t => t.id == id);
    if (taskIndex === -1) {
      return true;
    }
    tasks.splice(taskIndex, 1);
    await this.storage.setItem(KEY_TASKS, JSON.stringify(tasks));
    return true;
  }

  async deleteAll(): Promise<boolean> {
    await this.storage.removeItem(KEY_TASKS);
    return true;
  }
}