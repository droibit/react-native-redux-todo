import {
  createStore,
  applyMiddleware,
  combineReducers,
  Store,
  Action,
} from "redux";
import {
  persistReducer,
  persistStore,
  PersistConfig,
  Persistor,
  BoostrappedCallback,
} from "redux-persist";
import thunk from "redux-thunk";
import { AsyncStorage } from "react-native";
import * as Config from "../../config/config";
import { taskReducer } from "./task/reducer";
import { appSettingsReducer } from "./settings/reducer";
import immutableTransform from "redux-persist-transform-immutable";
import {
  RootStateProps,
  RootStateKeys,
} from "./type";
import { AppSettings, TaskSortSetting } from "../model/settings";

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
      records: [
        AppSettings,
        TaskSortSetting,
      ],
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

export function configurePersistStore(store: Store, bootstrappedCallback: BoostrappedCallback): Persistor {
  console.log("Start Boot.")
  return persistStore(store, {}, bootstrappedCallback);
}