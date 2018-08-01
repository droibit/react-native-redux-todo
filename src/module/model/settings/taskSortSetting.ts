import { Record } from "immutable";

export enum TaskSortBy {
  TITLE = 0,
  TIMESTAMP,
}

export enum TaskSortByOrder {
  ASC = 0,
  DESC,
}

interface Props {
  taskSortBy: TaskSortBy;
  taskSortByOrder: TaskSortByOrder;
}

export class TaskSortSetting extends Record(
  {
    taskSortBy: TaskSortBy.TITLE,
    taskSortByOrder: TaskSortByOrder.ASC,
  } as Props,
  "TaskSortSetting",
) {
  public readonly taskSortBy!: TaskSortBy;

  public readonly taskSortByOrder!: TaskSortByOrder;

  constructor(values: Props) {
    super(values);
  }

  public with(src: Partial<Props>): TaskSortSetting {
    return this.withMutations(s => s.merge(src)) as TaskSortSetting;
  }
}
