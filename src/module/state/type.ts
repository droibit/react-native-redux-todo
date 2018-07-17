import { AppSettings } from "../model/settings";
import { TaskState } from "../model/task";

export type AppSettingsStateProps = {
  appSettings: AppSettings,
};

export type TaskStateProps = {
  task: TaskState
};

export type RootStateProps = AppSettingsStateProps & TaskStateProps;