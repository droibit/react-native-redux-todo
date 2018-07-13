import { AppSettings } from "./appSettings";
import { AppSettingsStore} from "./appSettingsStore";
import { AsyncStorage } from "react-native";
import * as Config from "../../../../config/config";

const { KEY_SETTINGS } = Config.Storage;

export default class AppSettingsStoreImpl implements AppSettingsStore {

  constructor(private storage: AsyncStorage) {
  }

  public async getTaskSortSetting(): Promise<AppSettings.TaskSortSetting | null> {
    const json = await this.storage.getItem(KEY_SETTINGS);
    if (json == null) {
      return null;
    }
    const appSettingsJson: any = JSON.parse(json);
    const settings = new AppSettings(appSettingsJson);
    return settings.taskSortSetting;
  }

  public async setTaskSortSetting(setting: AppSettings.TaskSortSetting): Promise<boolean> {
    await this.storage.mergeItem(KEY_SETTINGS, JSON.stringify(setting));
    return true;
  }
}