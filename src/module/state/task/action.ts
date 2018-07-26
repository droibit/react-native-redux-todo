import {
  TASK_GET_STARTED,
  TASK_GET_DONE,
  TASK_CREATE_STARTED,
  TASK_CREATE_DONE,
  TASK_COMPLETE,
  TASK_ACTIVE,
  TASK_DELETE,
  TASK_UPDATE_STARTED,
  TASK_UPDATE_DONE,
} from "../action";
import { Dispatch } from "redux";
import { FSActionOnly } from "../reduxActionType";
import { FSA, ErrorFSA } from "flux-standard-action";
import { taskRepository } from "../../data/repository";
import { TaskEntity } from "../../data/repository/task";

export type GetTaskStartAction = FSActionOnly;
export type GetTaskDoneAction = FSA<ReadonlyArray<TaskEntity>>;
export type CreateTaskStartAction = FSActionOnly;
export type CreateTaskDoneAction = FSA<TaskEntity> | ErrorFSA<Error>;
export type CompleteTaskAction = FSA<TaskEntity> | ErrorFSA<Error>;
export type ActiveTaskAction = FSA<TaskEntity> | ErrorFSA<Error>;
export type DeleteTaskAction = FSA<string> | ErrorFSA<Error>;
export type UpdateTaskStartAction = FSActionOnly;
export type UpdateTaskDoneAction = FSA<TaskEntity> | ErrorFSA<Error>;

export const getTasks = () => {
  return async (dispatch: Dispatch<GetTaskStartAction | GetTaskDoneAction>) => {
    try {
      console.log("getTasks()");
      dispatch({ type: TASK_GET_STARTED });
      const taskEntities = await taskRepository.getTasks();
      console.log(`getTasks(${JSON.stringify(taskEntities)})`);
      dispatch({
        type: TASK_GET_DONE,
        payload: taskEntities
      });
    } catch (error) {
      console.error(`getTask(error=${error})`);
    }
  };
};

export const createTask = (title: string, description: string) => {
  return async (
    dispatch: Dispatch<CreateTaskStartAction | CreateTaskDoneAction>,
  ) => {
    console.log("createTask()");
    try {
      dispatch({ type: TASK_CREATE_STARTED });
      const entity = await taskRepository.createTask(title, description);
      dispatch({
        type: TASK_CREATE_DONE,
        payload: entity
      });
    } catch (error) {
      console.error(`createTask(error=${error})`);
      dispatch({
        type: TASK_CREATE_DONE,
        error: true,
        payload: error as Error
      });
    }
  };
};

export const completeTask = (taskId: string) => {
  return async (
    dispatch: Dispatch<CompleteTaskAction>,
  ) => {
    try {
      const completedTask = await taskRepository.completeTask(taskId);
      dispatch({
        type: TASK_COMPLETE,
        payload: completedTask,
      })
    } catch (error) {
      console.error(`completeTask(error=${error})`);
      dispatch({
        type: TASK_COMPLETE,
        error: true,
        payload: error as Error,
      });
    }
  };
};

export const activeTask = (taskId: string) => {
  return async (dispatch: Dispatch<ActiveTaskAction>) => {
    try {
      console.log("#activeTask()");
      const activedTask = await taskRepository.activeTask(taskId);
      dispatch({
        type: TASK_ACTIVE,
        payload: activedTask,
      })
    } catch (error) {
      console.error(`activeTask(error=${error})`);
      dispatch({
        type: TASK_ACTIVE,
        error: true,
        payload: error as Error,
      });
    }
  };
};

export const deleteTask = (taskId: string) => {
  return async (dispatch: Dispatch<DeleteTaskAction>) => {
    try {
      console.log("#deleteTask()");
      await taskRepository.deleteTask(taskId);
      dispatch({
        type: TASK_DELETE,
        payload: taskId,
      });
    } catch (error) {
      console.error(`deleteTask(error=${error})`);
      dispatch({
        type: TASK_DELETE,
        error: true,
        payload: error as Error,
      });
    }
  };
};

export const updateTask = (taskId: string, title: string, description: string) => {
  return async (
    dispatch: Dispatch<CreateTaskStartAction | CreateTaskDoneAction>,
  ) => {
    console.log("updateTask()");
    try {
      dispatch({ type: TASK_UPDATE_STARTED });
      const entity = await taskRepository.updateTask(taskId, title, description);
      dispatch({
        type: TASK_UPDATE_DONE,
        payload: entity
      });
    } catch (error) {
      console.error(`updateTask(error=${error})`);
      dispatch({
        type: TASK_UPDATE_DONE,
        error: true,
        payload: error as Error
      });
    }
  };
};