export class AppSettings {

  public readonly taskSortSetting: AppSettings.TaskSortSetting;

  constructor(values: AppSettings.Props) {
    this.taskSortSetting = values.taskSortSetting;
  }

  public copyWith(src: Partial<AppSettings.Props>): AppSettings {
    return Object.assign({}, this, src);
  }
}

export namespace AppSettings {
  export type Props = {
    taskSortSetting: AppSettings.TaskSortSetting,
  };

  export type TaskSortSetting = {
    sortBy: SortBy,
    order: SortByOrder,
  };

  export enum SortBy {
    TITLE = 0, TIMESTAMP,
  };

  export enum SortByOrder {
    ASC = 0, DESC,
  };
}
