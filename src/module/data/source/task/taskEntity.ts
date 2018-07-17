export default class TaskEntity {

  public readonly id: string;
  public readonly title: string;
  public readonly description?: string;
  public readonly timestamp: number;
  public readonly completed: boolean;

  constructor(values: TaskEntity.Props) {
    this.id = values.id;
    this.title = values.title;
    this.description = values.description;
    this.timestamp = values.timestamp;
    this.completed = values.completed;
  }

  public copyWith(src: Partial<TaskEntity.Props>): TaskEntity {
    return Object.assign({}, this, src) as TaskEntity;
  }
}

namespace TaskEntity {
  export type Props = {
    id: string,
    title: string,
    description?: string,
    timestamp: number,
    completed: boolean,
  };
}
