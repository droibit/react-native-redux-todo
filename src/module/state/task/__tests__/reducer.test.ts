import { Result } from "../../../model/result";
import { TaskState } from "../../../model/task";
import { TASK_GET_STARTED } from "../../actionType";
import { GetTaskStartAction } from "../actionCreator";
import { taskReducer } from "../reducer";

describe("TaskReducer", () => {
  test("initialState", () => {
    // @ts-ignore
    const actualState = taskReducer(undefined, {});
    expect(actualState).toEqual(new TaskState());
  });

  test("TASK_GET_STARTED", () => {
    const srcAction: GetTaskStartAction = {
      type: TASK_GET_STARTED,
    };
    const actualState = taskReducer(new TaskState(), srcAction);
    expect(actualState).toEqual(
      actualState.withLoadingResult(new Result({ inProgress: true })),
    );
  });
});
