import { AsyncStorage } from "react-native";
import {
  Action,
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
} from "redux";
import {
  BoostrappedCallback,
  PersistConfig,
  Persistor,
  persistReducer,
  persistStore,
} from "redux-persist";
import immutableTransform from "redux-persist-transform-immutable";
import thunk from "redux-thunk";
import * as Config from "../../config/config";
import { AppSettings, TaskSortSetting } from "../model/settings";
import { appSettingsReducer } from "./settings/reducer";
import { RootStateKeys, RootStateProps } from "./stateType";
import { taskReducer } from "./task/reducer";

const reducers = {
  task: taskReducer,
  appSettings: appSettingsReducer,
};
const rootReducer = combineReducers<RootStateProps>(reducers);

const { KEY_SETTINGS, PERSIST_VERSION } = Config.Storage;
const persistConfig: PersistConfig = {
  key: KEY_SETTINGS,
  storage: AsyncStorage,
  version: PERSIST_VERSION,
  transforms: [
    immutableTransform({
      records: [AppSettings, TaskSortSetting],
      whitelist: ["appSettings"] as Array<RootStateKeys>,
    }),
  ],
  whitelist: ["appSettings"] as Array<RootStateKeys>,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: Store<RootStateProps, Action> = createStore(
  persistedReducer,
  applyMiddleware(thunk),
);

// noinspection TsLint
export function configurePersistStore(
  srcStore: Store,
  bootstrappedCallback: BoostrappedCallback,
): Persistor {
  console.log("Start Boot.");
  return persistStore(srcStore, {}, bootstrappedCallback);
}
