import { TaskSortBy, TaskVisibilityFilter } from "../../../module/model/settings";

export function resolveVisiblFilterLongText(filter: TaskVisibilityFilter): string {
  switch (filter) {
    case TaskVisibilityFilter.ALL: return "All TO-DOs";
    case TaskVisibilityFilter.ACTIVE: return "Active TO-DOs";
    case TaskVisibilityFilter.COMPLETED: return "Completed TO-DOs";
  }
}

export function resolveVisiblFilterShortText(filter: TaskVisibilityFilter): string {
  switch (filter) {
    case TaskVisibilityFilter.ALL: return "All";
    case TaskVisibilityFilter.ACTIVE: return "Active";
    case TaskVisibilityFilter.COMPLETED: return "Completed";
  }
}

export function resolveSortByText(sortBy: TaskSortBy): string {
  switch (sortBy) {
    case TaskSortBy.TITLE: return "Title";
    case TaskSortBy.TIMESTAMP: return "Created Date";
  }
}