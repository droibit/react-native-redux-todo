import { Partial } from "../../../../utils/types";

export default class TaskEntity {
  
  public static fromJson(json: TaskEntity.Props): TaskEntity {
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

  public copyWith(src: TaskEntity.PartialProps): TaskEntity {
    return new TaskEntity(
      (src.id || this.id),
      (src.title || this.title),
      (src.description || this.description),
      (src.timestamp || this.timestamp),
      (src.completed || this.completed)
    )
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
  export type PartialProps = Partial<Props>;
}