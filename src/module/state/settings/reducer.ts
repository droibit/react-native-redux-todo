import AppSettings from "../../model/settings/appSettings";
import {
  TaskSortSetting,
  TaskSortBy,
  TaskSortByOrder,
  TaskVisibilityFilter,
} from "../../model/settings";
import {
  SETTINGS_UPDATE_TASK_SORT_BY,
  SETTINGS_UPDATE_TASK_SORT_BY_ORDER,
  SETTINGS_UPDATE_TASK_VISIBILITY_FILTER
} from "../actionType";
import {
  UpdateTaskSortByAction,
  UpdateTaskSortByOrderAction,
  UpdateTaskVisiblityFilterAction
} from "./actionCreator";

type FSAction =
  UpdateTaskSortByAction |
  UpdateTaskSortByOrderAction |
  UpdateTaskVisiblityFilterAction;

const initialState = new AppSettings({
  taskSortSetting: new TaskSortSetting({
    taskSortBy: TaskSortBy.TIMESTAMP,
    taskSortByOrder: TaskSortByOrder.DESC,
  }),
  taskVisibilityFilter: TaskVisibilityFilter.ALL,
});

export function appSettingsReducer(state: AppSettings = initialState, action: FSAction): AppSettings {
  console.log(`appSettingsReducer(action=${JSON.stringify(action)})`);
  switch (action.type) {
    case SETTINGS_UPDATE_TASK_SORT_BY:
      return state.with({
        taskSortSetting: state.taskSortSetting.with({
          taskSortBy: action.payload as TaskSortBy,
        }),
      });
    case SETTINGS_UPDATE_TASK_SORT_BY_ORDER:
      return state.with({
        taskSortSetting: state.taskSortSetting.with({
          taskSortByOrder: action.payload as TaskSortByOrder,
        }),
      });
    case SETTINGS_UPDATE_TASK_VISIBILITY_FILTER:
      return state.with({
        taskVisibilityFilter: action.payload as TaskVisibilityFilter
      });
    default:
      return state;
  }
}