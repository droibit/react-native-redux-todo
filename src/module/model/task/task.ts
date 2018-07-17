import { Record } from "immutable";

export class Task extends Record({
  id: "",
  title: "",
  description: "",
  timestamp: {},
  completed: false,
} as Task.Props) {
  public readonly id!: string;

  public readonly title!: string;

  public readonly description!: string;

  public readonly timestamp!: Date;

  public readonly completed!: boolean;

  constructor(values: Task.Props) {
    super(values);
  }

  public get isActive(): boolean {
    return !this.completed;
  }

  public with(src: Partial<Task.UpdatableProps>): Task {
    return this.withMutations(s => s.merge(src)) as Task;
  }
}

namespace Task {
  export type Props = {
    id: string,
    timestamp: Date,
  } & UpdatableProps;

  export type UpdatableProps = {
    title: string,
    description: string,
    completed: boolean,
  };
}
