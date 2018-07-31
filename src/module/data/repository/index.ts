import TaskRepository from './task/taskReposirory';
import TaskRepositoryImpl from './task/taskRepositoryImpl';
import TaskStoreImpl from '../source/task/taskStoreImpl';
import { AsyncStorage } from 'react-native';
import TimeProvider from '../source/time/timeProvider';
import { TaskStore } from '../source/task';

export const taskRepository: TaskRepository = new TaskRepositoryImpl(
  new TaskStoreImpl(
    AsyncStorage,
    new TaskStore.IdProvider(),
    new TimeProvider(),
  ),
);
