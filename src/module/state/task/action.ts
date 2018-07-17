import {
  TASK_GET_REQUEST,
  TASK_GET_RECEIVED,
} from "../actionType";
import { Action, Dispatch } from "redux";
import { AsyncThunkActionCreator } from "../types";
import { FSA } from "flux-standard-action";
import { TaskList } from "../../model/task";

export const getAllTasks: AsyncThunkActionCreator = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: TASK_GET_REQUEST });
  };
};
