import { Record } from "immutable";

type Props = {
  id: string;
  timestamp: Date;
} & UpdatableProps;

interface UpdatableProps {
  title: string;
  description: string;
  completed: boolean;
}

export class Task extends Record({
  id: "",
  title: "",
  description: "",
  timestamp: {},
  completed: false,
} as Props) {
  public readonly id!: string;

  public readonly title!: string;

  public readonly description!: string;

  public readonly timestamp!: Date;

  public readonly completed!: boolean;

  constructor(values: Props) {
    super(values);
  }

  public get isActive(): boolean {
    return !this.completed;
  }

  public with(src: Partial<UpdatableProps>): Task {
    return this.withMutations(s => s.merge(src)) as Task;
  }
}
