import AppSettingsRepository from "./appSettingsRepository";
import { AppSettingsStore, AppSettings } from "../../source/settings";

export default class AppSettingsRepositoryImpl implements AppSettingsRepository {

  constructor(
    private readonly store: AppSettingsStore,
  ) {
  }

  public getTaskSortSetting(): Promise<AppSettings.TaskSortSetting | null> {
    return this.store.getTaskSortSetting();
  }

  public setTaskSortSetting(sortBy: AppSettings.SortBy, order: AppSettings.SortByOrder): Promise<boolean> {
    return this.store.setTaskSortSetting({ sortBy, order });
  }
}
