import { Task, TaskList, TaskState } from "../../model/task";
import { FSA, isError, ErrorFSA } from "flux-standard-action";
import {
  TASK_GET_DONE,
  TASK_CREATE_STARTED,
  TASK_CREATE_DONE,
  TASK_GET_STARTED,
  TASK_COMPLETE,
  TASK_ACTIVE
} from "../action";
import { Result } from "../../model/result";
import { TaskEntity } from "../../data/source/task";
import {
  GetTaskStartAction,
  GetTaskDoneAction,
  CreateTaskStartAction,
  CreateTaskDoneAction,
  CompleteTaskAction,
  ActiveTaskAction
} from "./action";

type TaskAction =
  | GetTaskStartAction
  | GetTaskDoneAction
  | CreateTaskStartAction
  | CreateTaskDoneAction
  | CompleteTaskAction
  | ActiveTaskAction;

export function taskReducer(
  state: TaskState = new TaskState(),
  action: TaskAction
): TaskState {
  console.log(`taskReducer(action=${JSON.stringify(action)})`);
  switch (action.type) {
    case TASK_GET_STARTED:
      return onWillGetAllTasks(state);
    case TASK_GET_DONE:
      return onGetAllTasks(state, action.payload as Array<TaskEntity>);
    case TASK_CREATE_STARTED:
      return onWillCreateTask(state);
    case TASK_CREATE_DONE:
      return onDidCreateTask(state, action as CreateTaskDoneAction);
    case TASK_COMPLETE:
      return onCompleteTask(state, action as CompleteTaskAction);
    case TASK_ACTIVE:
      return onActiveTask(state, action as ActiveTaskAction);
    default:
      return state;
  }
}

function onWillGetAllTasks(state: TaskState): TaskState {
  return state.withLoadingResult(new Result({ inProgress: true }));
}

function onGetAllTasks(
  state: TaskState,
  entities: Array<TaskEntity>
): TaskState {
  const tasks = entities.map(entityToTask);
  return state.withTasks(new TaskList().addTasks(tasks));
}

function onWillCreateTask(state: TaskState): TaskState {
  return state.withCreateResult(state.createResult.asInProgress());
}

function onDidCreateTask(
  state: TaskState,
  action: CreateTaskDoneAction
): TaskState {
  let result: Result<Task>;
  if (isError(action)) {
    // TODO: Convert custom error.
    result = state.createResult.asError(action.payload!);
  } else {
    result = state.createResult.asSuccess(entityToTask(action.payload!));
  }
  return state.withCreateResult(result);
}

function onCompleteTask(state: TaskState, action: CompleteTaskAction): TaskState {
  let result: Result<Task>;
  if (isError(action)) {
    result = state.completeResult.asError(action.payload!);
  } else {
    result = state.createResult.asSuccess(entityToTask(action.payload!));
  }
  return state.withCompleteResult(result);
}

function onActiveTask(state: TaskState, action: ActiveTaskAction): TaskState {
  let result: Result<Task>;
  if (isError(action)) {
    result = state.activeResult.asError(action.payload!);
  } else {
    result = state.activeResult.asSuccess(entityToTask(action.payload!));
  }
  return state.withActiveResult(result);
}

function entityToTask(entity: TaskEntity): Task {
  return new Task({
    id: entity.id,
    title: entity.title,
    description: entity.description || "",
    timestamp: new Date(entity.timestamp),
    completed: entity.completed
  });
}
