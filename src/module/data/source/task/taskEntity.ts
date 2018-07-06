export type TaskEntityJson = {
  id: string,
  title: string,
  description?: string,
  timestamp: number,
  completed: boolean,
}

export default class TaskEntity {

  public static fromJson(json: TaskEntityJson): TaskEntity {
    return new TaskEntity(json.id, json.title, json.description, json.timestamp, json.completed);
  }

  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string | undefined,
    public readonly timestamp: number,
    public readonly completed: boolean
  ) {
  }

  public copyWith(
    src: {
      id?: string,
      title?: string,
      description?: string,
      timestamp?: number,
      completed?: boolean,
    }
  ): TaskEntity {
    return new TaskEntity(
      (src.id || this.id),
      (src.title || this.title),
      (src.description || this.description),
      (src.timestamp || this.timestamp),
      (src.completed || this.completed)
    )
  }
}