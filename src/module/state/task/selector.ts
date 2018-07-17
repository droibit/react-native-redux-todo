import { List } from "immutable";
import {
  createSelector,
  Selector,
} from "reselect";
import {
  Task,
  TaskList,
} from "../../model/task";
import {
  AppSettings,
  TaskSortSetting,
  TaskSortBy,
  TaskSortByOrder,
  TaskVisibilityFilter,
} from "../../model/settings";
import {
  TaskStateProps,
  AppSettingsStateProps,
} from "../type";

export const filteredAndSortedTasks = createSelector<TaskStateProps & AppSettingsStateProps, TaskList, TaskSortSetting, TaskVisibilityFilter, List<Task>>(
  (state) => state.task.tasks,
  (state) => state.appSettings.taskSortSetting,
  (state) => state.appSettings.taskVisibilityFilter,
  (tasks, sortSettings, visibilityFilter) => {
    return tasks.tasks.filter((t) => {
      switch (visibilityFilter) {
        case TaskVisibilityFilter.ALL:
          return true;
        case TaskVisibilityFilter.ACTIVE:
          return t!.isActive;
        case TaskVisibilityFilter.COMPLETED:
          return t!.completed;
      }
    }).sort((lhs, rhs) => {
      switch (sortSettings.taskSortBy) {
        case TaskSortBy.TITLE:
          return (sortSettings.taskSortByOrder == TaskSortByOrder.ASC) ?
            lhs.title.localeCompare(rhs.title) :
            rhs.title.localeCompare(lhs.title);
        case TaskSortBy.TIMESTAMP:
          // ref. https://github.com/Microsoft/TypeScript/issues/5710
          return (sortSettings.taskSortByOrder == TaskSortByOrder.ASC) ?
            +lhs.timestamp - +rhs.timestamp :
            +rhs.timestamp - +lhs.timestamp;
      }
    })
      .toList();
  }
)