import { List } from "immutable";
import {
  createSelector,
} from "reselect";
import {
  Task,
  TaskList,
} from "../../model/task";
import {
  TaskSortSetting,
  TaskSortBy,
  TaskSortByOrder,
  TaskVisibilityFilter,
} from "../../model/settings";
import {
  TaskStateProps,
  AppSettingsStateProps,
} from "../type";

export const filteredAndSortedTasks = createSelector<TaskStateProps & AppSettingsStateProps, TaskList, TaskSortSetting, TaskVisibilityFilter, Array<Task>>(
  (state) => state.task.tasks,
  (state) => state.appSettings.taskSortSetting,
  (state) => state.appSettings.taskVisibilityFilter,
  (srcTasks, sortSetting, visibilityFilter) => {
    const destTasks = srcTasks.tasks.filter((t) => {
      switch (visibilityFilter) {
        case TaskVisibilityFilter.ALL:
        return true;
        case TaskVisibilityFilter.ACTIVE:
        return t!.isActive;
        case TaskVisibilityFilter.COMPLETED:
        return t!.completed;
      }
    }).sort((lhs, rhs) => {
      switch (sortSetting.taskSortBy) {
        case TaskSortBy.TITLE:
        return (sortSetting.taskSortByOrder == TaskSortByOrder.ASC) ?
        lhs.title.localeCompare(rhs.title) :
        rhs.title.localeCompare(lhs.title);
        case TaskSortBy.TIMESTAMP:
        // ref. https://github.com/Microsoft/TypeScript/issues/5710
        return (sortSetting.taskSortByOrder == TaskSortByOrder.ASC) ?
        +lhs.timestamp - +rhs.timestamp :
        +rhs.timestamp - +lhs.timestamp;
      }
    })
    .toArray();
    console.log(`filteredAndSortedTasks(): ${JSON.stringify(destTasks)}`);
    return destTasks;
  }
)