import { AsyncStorage } from "react-native";
import { TaskStore } from "../source/task";
import TaskStoreImpl from "../source/task/taskStoreImpl";
import TimeProvider from "../source/time/timeProvider";
import TaskRepository from "./task/taskReposirory";
import TaskRepositoryImpl from "./task/taskRepositoryImpl";

export const taskRepository: TaskRepository = new TaskRepositoryImpl(
  new TaskStoreImpl(
    AsyncStorage,
    new TaskStore.IdProvider(),
    new TimeProvider(),
  ),
);
