import { AppSettings } from "../../source/settings";

export default interface AppSettingsRepository {

  getTaskSortSetting(): Promise<AppSettings.TaskSortSetting | null>;

  setTaskSortSetting(sortBy: AppSettings.SortBy, order: AppSettings.SortByOrder): Promise<boolean>;
}