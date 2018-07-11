import { Partial } from "../../../../utils/types";

export class AppSettings {

  public readonly taskSortSetting: AppSettings.TaskSortSetting;

  constructor(values: AppSettings.Props) {
    this.taskSortSetting = values.taskSortSetting;
  }

  public copyWith(src: AppSettings.PartialProps): AppSettings {
    return new AppSettings({
      taskSortSetting: (src.taskSortSetting || this.taskSortSetting)
    })
  }
}

export namespace AppSettings {
  export type Props = {
    taskSortSetting: AppSettings.TaskSortSetting
  };
  export type PartialProps = Partial<Props>;

  export type TaskSortSetting = {
    sortBy: SortBy,
    order: SortByOrder
  };
  export enum SortBy {
    TITLE = 0, TIMESTAMP
  };

  export enum SortByOrder {
    ASC = 0, DESC
  }
}