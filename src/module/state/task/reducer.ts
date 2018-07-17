import {
  Task,
  TaskList,
  TaskState,
} from "../../model/task";
import {
  FSA,
  isError,
} from "flux-standard-action";
import {
  TASK_GET_RECEIVED,
  TASK_CREATE_REQUEST,
  TASK_CREATE_RECEIVED,
} from "../action";
import { Result } from "../../model/result";
import { TaskEntity } from "../../data/source/task";

type FSAction = FSA<Array<TaskEntity>> | FSA<TaskEntity | Error>;

export function taskReducer(state: TaskState = new TaskState(), action: FSAction): TaskState {
  switch (action.type) {
    case TASK_GET_RECEIVED:
      return onGetAllTasks(state, action.payload as Array<TaskEntity>);
    case TASK_CREATE_REQUEST:
      return onWillCreateTask(state);
    case TASK_CREATE_RECEIVED:
      return onDidCreateTask(state, action as FSA<TaskEntity | Error>);
    default:
      return state;
  }
}

function onGetAllTasks(state: TaskState, entities: Array<TaskEntity>): TaskState {
  const tasks = entities.map(entityToTask);
  return state.withTasks(new TaskList().addTasks(tasks))
}

function onWillCreateTask(state: TaskState): TaskState {
  return state.withCreateResult(state.createResult.asInProgress());
}

function onDidCreateTask(state: TaskState, action: FSA<TaskEntity | Error>): TaskState {
  let result: Result<Task>;
  if (isError(action)) {
    // TODO: Convert custom error.
    result = state.createResult.asError(action.payload as Error);
  } else {
    result = state.createResult.asSuccess(entityToTask(action.payload as TaskEntity));
  }
  return state.withCreateResult(result);
}

function entityToTask(entity: TaskEntity): Task {
  return new Task({
    id: entity.id,
    title: entity.title,
    description: entity.description || "",
    timestamp: new Date(entity.timestamp),
    completed: entity.completed,
  });
}
