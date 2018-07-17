import { Record } from "immutable";

export enum TaskSortBy {
  TITLE = 0, TIMESTAMP,
}

export enum TaskSortByOrder {
  ASC = 0, DESC,
}

export class TaskSortSetting extends Record({
  taskSortBy: TaskSortBy.TITLE,
  taskSortByOrder: TaskSortByOrder.ASC,
} as TaskSortSetting.Props) {

  public readonly taskSortBy!: TaskSortBy;

  public readonly taskSortByOrder!: TaskSortByOrder;

  constructor(values: TaskSortSetting.Props) {
    super(values);
  }

  public with(src: Partial<TaskSortSetting.Props>): TaskSortSetting {
    return this.withMutations(s => s.merge(src)) as TaskSortSetting;
  }
}

export namespace TaskSortSetting {

  export type Props = {
    taskSortBy: TaskSortBy,
    taskSortByOrder: TaskSortByOrder
  };
}