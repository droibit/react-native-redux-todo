import {
  TASK_GET_REQUEST,
  TASK_GET_RECEIVED,
  TASK_CREATE_REQUEST,
  TASK_CREATE_RECEIVED,
} from "../action";
import { Dispatch } from "redux";
import { AsyncThunkActionCreator } from "../reduxActionType";
import { FSA } from "flux-standard-action";
import { taskRepository } from "../../data/repository";
import { TaskEntity } from "../../data/source/task";

export const getTasks = () => {
  return async (dispatch: Dispatch<FSA<ReadonlyArray<TaskEntity>>>) => {
    // dispatch({ type: TASK_GET_REQUEST });
    const taskEntities = await taskRepository.getTasks();
    dispatch({
      type: TASK_GET_RECEIVED,
      payload: taskEntities
    })
  };
};

export const createTask = (title: string, description?: string) => {
  return async (dispatch: Dispatch<FSA<any>>) => {
    try {
      dispatch({ type: TASK_CREATE_REQUEST })
      const entity = await taskRepository.createTask(title, description);
      dispatch({
        type: TASK_CREATE_RECEIVED,
        payload: entity,
      })
    } catch (e) {
      console.log(e);
      dispatch({
        type: TASK_CREATE_RECEIVED,
        error: true,
        payload: e as Error
      })
    }
  };
}