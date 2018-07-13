import { AppSettings } from "./appSettings";

export interface AppSettingsStore {

  getTaskSortSetting(): Promise<AppSettings.TaskSortSetting | null>;

  setTaskSortSetting(setting: AppSettings.TaskSortSetting): Promise<boolean>;
}
