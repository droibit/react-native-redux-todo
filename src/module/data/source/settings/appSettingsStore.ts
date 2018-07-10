import { AppSettings } from "./appSettings";

export interface AppSettingsStore {

  getTaskSortSetting(): Promise<AppSettings.TaskSortSetting | null>;

  setTaskSortSetting(sortBy: AppSettings.SortBy, order: AppSettings.SortByOrder): Promise<boolean>;
}