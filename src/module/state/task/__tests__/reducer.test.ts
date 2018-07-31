import { taskReducer } from '../reducer';
import { TaskState } from '../../../model/task';
import { GetTaskStartAction } from '../actionCreator';
import { TASK_GET_STARTED } from '../../actionType';
import { Result } from '../../../model/result';

describe('TaskReducer', () => {
  test('initialState', () => {
    // @ts-ignore
    const actualState = taskReducer(undefined, {});
    expect(actualState).toEqual(new TaskState());
  });

  test('TASK_GET_STARTED', () => {
    const srcAction: GetTaskStartAction = {
      type: TASK_GET_STARTED,
    };
    const actualState = taskReducer(new TaskState(), srcAction);
    expect(actualState).toEqual(
      actualState.withLoadingResult(new Result({ inProgress: true })),
    );
  });
});
