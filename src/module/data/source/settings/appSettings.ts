export class AppSettings {

  public static fromJson(json: {
    taskSortSetting: AppSettings.TaskSortSetting
  }): AppSettings {
    return new AppSettings(json.taskSortSetting);
  }

  constructor(
    public readonly taskSortSetting: AppSettings.TaskSortSetting,
  ) {
  }

  public copyWith(src: {
    taskSortSetting?: AppSettings.TaskSortSetting
  }): AppSettings {
    return new AppSettings(
      (src.taskSortSetting || this.taskSortSetting)
    )
  }
}

export namespace AppSettings {
  export type TaskSortSetting = {
    sortBy: AppSettings.SortBy,
    order: AppSettings.SortByOrder
  };
  export enum SortBy {
    TITLE = 0, TIMESTAMP
  };

  export enum SortByOrder {
    ASC = 0, DESC
  }
}