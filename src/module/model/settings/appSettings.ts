import { Record } from "immutable";
import { AppSettings as AppSettingsSource } from "../../data/source/settings"
import { TaskSortSetting } from "./taskSortSetting";
import { Partial } from "../../../utils/types";

export default class AppSettings extends Record({
  taskSortSetting: {},
} as AppSettings.Props) {

  public readonly taskSortSetting: TaskSortSetting;

  constructor(values: AppSettings.Props) {
    super(values);
  }

  public with(src: AppSettings.PartialProps): AppSettings {
    return this.withMutations(s => s.merge(src)) as AppSettings;
  }
}

export namespace AppSettings {

  export type Props = {
    taskSortSetting: TaskSortSetting
  };
  export type PartialProps = Partial<Props>;
}