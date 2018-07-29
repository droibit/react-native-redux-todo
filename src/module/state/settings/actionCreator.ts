import { FSA } from "flux-standard-action";
import {
  SETTINGS_UPDATE_TASK_VISIBILITY_FILTER,
  SETTINGS_UPDATE_TASK_SORT_BY,
  SETTINGS_UPDATE_TASK_SORT_BY_ORDER
} from "../actionType";
import {
  TaskSortBy,
  TaskSortByOrder,
  TaskVisibilityFilter
} from "../../model/settings";

export type UpdateTaskSortByAction = FSA<TaskSortBy>;
export type UpdateTaskSortByOrderAction = FSA<TaskSortByOrder>;
export type UpdateTaskVisiblityFilterAction = FSA<TaskVisibilityFilter>;

export const updateTaskSortBy = (
  sortBy: TaskSortBy
): UpdateTaskSortByAction => {
  return {
    type: SETTINGS_UPDATE_TASK_SORT_BY,
    payload: sortBy
  };
};

export const updateTaskSortByOrder = (
  order: TaskSortByOrder
): UpdateTaskSortByOrderAction => {
  return {
    type: SETTINGS_UPDATE_TASK_SORT_BY_ORDER,
    payload: order
  };
};

export const updateTaskVisiblityFilter = (
  filter: TaskVisibilityFilter
): UpdateTaskVisiblityFilterAction => {
  return {
    type: SETTINGS_UPDATE_TASK_VISIBILITY_FILTER,
    payload: filter
  };
};
