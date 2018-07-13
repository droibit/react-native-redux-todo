import { Record } from "immutable";

export class Task extends Record({
  id: "",
  title: "",
  description: "",
  timestamp: {},
  completed: false
} as Task.Props) {

  public readonly id: string;

  public readonly title: string;

  public readonly description: string;

  public readonly timestamp: Date;

  public readonly completed: boolean;

  constructor(values: Task.Props) {
    super(values)
  }

  public with(src: Task.UpdatableProps): Task {
    return this.withMutations(s => s.merge(src)) as Task;
  }
}

export namespace Task {

  export type Props = {
    id: string,
    title: string,
    description: string,
    timestamp: Date,
    completed: boolean,
  };
  export type UpdatableProps = {
    title?: string,
    description?: string,
    completed?: boolean,
  };
}
