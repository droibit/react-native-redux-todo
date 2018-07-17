import {
  SETTINGS_UPDATE_TASK_SORTING,
  SETTINGS_UPDATE_TASK_VISIBILITY_FILTER
} from "../action";
import {
  TaskSortBy,
  TaskSortByOrder,
  TaskSortSetting,
  TaskVisibilityFilter
} from "../../model/settings";
import { FSA } from "flux-standard-action";

export const updateTaskSortSetting = (taskSortBy: TaskSortBy, taskSortByOrder: TaskSortByOrder): FSA<TaskSortSetting> => {
  return {
    type: SETTINGS_UPDATE_TASK_SORTING,
    payload: new TaskSortSetting({ taskSortBy, taskSortByOrder }),
  };
}

export const updateTaskVisibilityFilter = (taskVisibilityFilter: TaskVisibilityFilter): FSA<TaskVisibilityFilter> => {
  return {
    type: SETTINGS_UPDATE_TASK_VISIBILITY_FILTER,
    payload: taskVisibilityFilter
  };
};