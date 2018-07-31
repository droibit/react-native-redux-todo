import * as Action from '../actionCreator';
import {
  UpdateTaskSortByAction,
  UpdateTaskSortByOrderAction,
  UpdateTaskVisibilityFilterAction,
} from '../actionCreator';
import {
  SETTINGS_UPDATE_TASK_SORT_BY,
  SETTINGS_UPDATE_TASK_SORT_BY_ORDER,
  SETTINGS_UPDATE_TASK_VISIBILITY_FILTER,
} from '../../actionType';
import {
  TaskSortBy,
  TaskSortByOrder,
  TaskVisibilityFilter,
} from '../../../model/settings';

describe('AppSettingsActionCreator', () => {
  test('updateTaskSortBy()', () => {
    const payload = TaskSortBy.TITLE;
    const expectAction: UpdateTaskSortByAction = {
      type: SETTINGS_UPDATE_TASK_SORT_BY,
      payload,
    };
    expect(Action.updateTaskSortBy(payload)).toEqual(expectAction);
  });

  test('updateTaskSortByOrder()', () => {
    const payload = TaskSortByOrder.ASC;
    const expectAction: UpdateTaskSortByOrderAction = {
      type: SETTINGS_UPDATE_TASK_SORT_BY_ORDER,
      payload,
    };
    expect(Action.updateTaskSortByOrder(payload)).toEqual(expectAction);
  });

  test('updateTaskVisibilityFilter()', () => {
    const payload = TaskVisibilityFilter.ACTIVE;
    const expectAction: UpdateTaskVisibilityFilterAction = {
      type: SETTINGS_UPDATE_TASK_VISIBILITY_FILTER,
      payload,
    };
    expect(Action.updateTaskVisibilityFilter(payload)).toEqual(expectAction);
  });
});
