import { AppSettings } from "./appSettings";
import { AppSettingsStore} from "./appSettingsStore";
import { AsyncStorage } from "react-native";
import * as Config from "../../../../config/config";

const { KEY_SETTINGS } = Config.Storage;

export default class AppSettingsStoreImpl implements AppSettingsStore {

  constructor(private storage: AsyncStorage) {
  }

  async getTaskSortSetting(): Promise<AppSettings.TaskSortSetting | null> {
    const json = await this.storage.getItem(KEY_SETTINGS);
    if (json == null) {
      return null
    }
    const appSettingsJson: any = JSON.parse(json);
    const settings = AppSettings.fromJson(appSettingsJson);
    return settings.taskSortSetting;
  }

  async setTaskSortSetting(sortBy: AppSettings.SortBy, order: AppSettings.SortByOrder): Promise<boolean> {
    let newSettings: AppSettings.TaskSortSetting = { sortBy, order };
    await this.storage.mergeItem(KEY_SETTINGS, JSON.stringify(newSettings));
    return true;
  }
}