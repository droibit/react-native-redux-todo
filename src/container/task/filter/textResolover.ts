import {
  TaskSortBy,
  TaskVisibilityFilter,
} from '../../../module/model/settings';
import I18n from '../../../i18n';

export function resolveVisibleFilterLongText(
  filter: TaskVisibilityFilter,
): string {
  switch (filter) {
    case TaskVisibilityFilter.ALL:
      return I18n.t('todoListHeaderAll');
    case TaskVisibilityFilter.ACTIVE:
      return I18n.t('todoListHeaderActive');
    case TaskVisibilityFilter.COMPLETED:
      return I18n.t('todoListHeaderCompleted');
  }
}

export function resolveVisibleFilterShortText(
  filter: TaskVisibilityFilter,
): string {
  switch (filter) {
    case TaskVisibilityFilter.ALL:
      return I18n.t('filterTaskAll');
    case TaskVisibilityFilter.ACTIVE:
      return I18n.t('filterTaskActive');
    case TaskVisibilityFilter.COMPLETED:
      return I18n.t('filterTaskCompleted');
  }
}

export function resolveSortByText(sortBy: TaskSortBy): string {
  switch (sortBy) {
    case TaskSortBy.TITLE:
      return I18n.t('sortTaskByTitle');
    case TaskSortBy.TIMESTAMP:
      return I18n.t('sortTaskByTimpestamp');
  }
}
