import { FSA } from "flux-standard-action";
import {
  TaskSortBy,
  TaskSortByOrder,
  TaskVisibilityFilter,
} from "../../model/settings";
import {
  SETTINGS_UPDATE_TASK_SORT_BY,
  SETTINGS_UPDATE_TASK_SORT_BY_ORDER,
  SETTINGS_UPDATE_TASK_VISIBILITY_FILTER,
} from "../actionType";

export type UpdateTaskSortByAction = FSA<TaskSortBy>;
export type UpdateTaskSortByOrderAction = FSA<TaskSortByOrder>;
export type UpdateTaskVisibilityFilterAction = FSA<TaskVisibilityFilter>;

export const updateTaskSortBy = (
  sortBy: TaskSortBy,
): UpdateTaskSortByAction => {
  return {
    type: SETTINGS_UPDATE_TASK_SORT_BY,
    payload: sortBy,
  };
};

export const updateTaskSortByOrder = (
  order: TaskSortByOrder,
): UpdateTaskSortByOrderAction => {
  return {
    type: SETTINGS_UPDATE_TASK_SORT_BY_ORDER,
    payload: order,
  };
};

export const updateTaskVisibilityFilter = (
  filter: TaskVisibilityFilter,
): UpdateTaskVisibilityFilterAction => {
  return {
    type: SETTINGS_UPDATE_TASK_VISIBILITY_FILTER,
    payload: filter,
  };
};
