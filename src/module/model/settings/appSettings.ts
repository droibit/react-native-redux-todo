import { Record } from "immutable";
import { TaskSortSetting } from "./taskSortSetting";
import { TaskVisibilityFilter } from "./taskVisiblityFilter";

type Props = {
  taskSortSetting: TaskSortSetting,
  taskVisibilityFilter: TaskVisibilityFilter,
};

export default class AppSettings extends Record({
  taskSortSetting: {},
  taskVisibilityFilter: {},
} as Props) {

  public readonly taskSortSetting!: TaskSortSetting;

  public readonly taskVisibilityFilter!: TaskVisibilityFilter;

  constructor(values: Props) {
    super(values);
  }

  public with(src: Partial<Props>): AppSettings {
    return this.withMutations(s => s.merge(src)) as AppSettings;
  }
}