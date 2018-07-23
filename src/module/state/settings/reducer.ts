import { FSA } from "flux-standard-action";
import AppSettings from "../../model/settings/appSettings";
import {
  TaskSortSetting,
  TaskSortBy,
  TaskSortByOrder,
  TaskVisibilityFilter,
} from "../../model/settings";
import {
  SETTINGS_UPDATE_TASK_SORTING,
  SETTINGS_UPDATE_TASK_VISIBILITY_FILTER
} from "../action";

type FSAction = FSA<TaskSortSetting> | FSA<TaskVisibilityFilter>;

const initialState = new AppSettings({
  taskSortSetting: new TaskSortSetting({
    taskSortBy: TaskSortBy.TIMESTAMP,
    taskSortByOrder: TaskSortByOrder.DESC,
  }),
  taskVisibilityFilter: TaskVisibilityFilter.ALL,
});

export function appSettingsReducer(state: AppSettings = initialState, action: FSAction): AppSettings {
  switch (action.type) {
    case SETTINGS_UPDATE_TASK_SORTING:
      return state.with({
        taskSortSetting: action.payload as TaskSortSetting
      });
    case SETTINGS_UPDATE_TASK_VISIBILITY_FILTER:
      return state.with({
        taskVisibilityFilter: action.payload as TaskVisibilityFilter
      });
    default:
      return state;
  }
}