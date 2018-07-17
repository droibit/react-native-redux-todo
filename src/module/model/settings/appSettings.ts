import { Record } from "immutable";
import { TaskSortSetting } from "./taskSortSetting";
import { TaskVisibilityFilter } from "./taskVisiblityFilter";

export default class AppSettings extends Record({
  taskSortSetting: {},
  taskVisibilityFilter: {},
} as AppSettings.Props) {

  public readonly taskSortSetting!: TaskSortSetting;

  public readonly taskVisibilityFilter!: TaskVisibilityFilter;

  constructor(values: AppSettings.Props) {
    super(values);
  }

  public with(src: Partial<AppSettings.Props>): AppSettings {
    return this.withMutations(s => s.merge(src)) as AppSettings;
  }
}

export namespace AppSettings {

  export type Props = {
    taskSortSetting: TaskSortSetting,
    taskVisibilityFilter: TaskVisibilityFilter,
  };
}
