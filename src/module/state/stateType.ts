import { AppSettings } from "../model/settings";
import { TaskState } from "../model/task";

export interface AppSettingsStateProps {
  appSettings: AppSettings;
}

export interface TaskStateProps {
  task: TaskState;
}

export type RootStateProps = AppSettingsStateProps & TaskStateProps;
export type RootStateKeys = keyof RootStateProps;
