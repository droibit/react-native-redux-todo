import {
  TASK_GET_STARTED,
  TASK_GET_DONE,
  TASK_CREATE_STARTED,
  TASK_CREATE_DONE
} from "../action";
import { Dispatch, Action } from "redux";
import { FSActionOnly } from "../reduxActionType";
import { FSA, ErrorFSA } from "flux-standard-action";
import { taskRepository } from "../../data/repository";
import { TaskEntity } from "../../data/repository/task";

export type GetTaskStartAction = FSActionOnly;
export type GetTaskDoneAction = FSA<ReadonlyArray<TaskEntity>>;

export const getTasks = () => {
  return async (dispatch: Dispatch<GetTaskStartAction | GetTaskDoneAction>) => {
    console.log("getTasks()");
    dispatch({ type: TASK_GET_STARTED });
    const taskEntities = await taskRepository.getTasks();
    dispatch({
      type: TASK_GET_DONE,
      payload: taskEntities
    });
  };
};

export type CreateTaskStartAction = FSActionOnly;
export type CreateTaskDoneAction = FSA<TaskEntity> | ErrorFSA<Error>;

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
    } catch (e) {
      console.log(e);
      dispatch({
        type: TASK_CREATE_DONE,
        error: true,
        payload: e as Error
      });
    }
  };
};
