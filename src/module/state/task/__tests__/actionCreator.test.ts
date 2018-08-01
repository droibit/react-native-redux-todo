import { Action } from "redux";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import { taskRepository } from "../../../data/repository";
import TaskEntity from "../../../data/source/task/taskEntity";
import { TaskState } from "../../../model/task";
import {
  TASK_CREATE_DONE,
  TASK_CREATE_STARTED,
  TASK_GET_DONE,
  TASK_GET_STARTED,
} from "../../actionType";
import { ReduxThunkDispatch } from "../../reduxActionType";
import { TaskStateProps } from "../../stateType";
import * as Actions from "../actionCreator";
import {
  CreateTaskDoneAction,
  CreateTaskStartAction,
  GetTaskDoneAction,
  GetTaskStartAction,
} from "../actionCreator";

jest.mock("../../../data/repository");

const mockStore = configureMockStore<TaskStateProps>([thunk]);

describe("TaskActionCreator", () => {
  let store: MockStoreEnhanced<TaskStateProps, {}>;
  let dispatch: ReduxThunkDispatch<Action>;
  beforeEach(() => {
    store = mockStore({
      task: new TaskState(),
    });
    dispatch = store.dispatch;
  });

  test("getTasks()", async () => {
    const mockTasks = [{} as TaskEntity, {} as TaskEntity];
    (taskRepository.getTasks as jest.Mock).mockReturnValue(mockTasks);

    const expectStartAction: GetTaskStartAction = {
      type: TASK_GET_STARTED,
    };
    const expectDoneAction: GetTaskDoneAction = {
      type: TASK_GET_DONE,
      payload: mockTasks,
    };

    await dispatch(Actions.getTasks());

    expect(store.getActions()).toEqual([expectStartAction, expectDoneAction]);
    expect(taskRepository.getTasks).toHaveBeenCalled();
  });

  test("createTask()", async () => {
    const mockTask = {} as TaskEntity;
    (taskRepository.createTask as jest.Mock).mockReturnValue(mockTask);

    const expectTitle = "title";
    const expectDesc = "desc";
    await dispatch(Actions.createTask(expectTitle, expectDesc));

    const expectStartedAction: CreateTaskStartAction = {
      type: TASK_CREATE_STARTED,
    };
    const expectDoneAction: CreateTaskDoneAction = {
      type: TASK_CREATE_DONE,
      payload: mockTask,
    };
    expect(store.getActions()).toEqual([expectStartedAction, expectDoneAction]);
    expect(taskRepository.createTask).toHaveBeenLastCalledWith(
      expectTitle,
      expectDesc,
    );
  });
});
