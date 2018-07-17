import { Record } from "immutable";
import { TaskSortSetting } from "./taskSortSetting";

export default class AppSettings extends Record({
  taskSortSetting: {},
} as AppSettings.Props) {

  public readonly taskSortSetting!: TaskSortSetting;

  constructor(values: AppSettings.Props) {
    super(values);
  }

  public with(src: Partial<AppSettings.Props>): AppSettings {
    return this.withMutations(s => s.merge(src)) as AppSettings;
  }
}

export namespace AppSettings {

  export type Props = {
    taskSortSetting: TaskSortSetting
  };
}
