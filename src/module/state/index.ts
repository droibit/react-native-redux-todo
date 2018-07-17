import {
  createStore,
  applyMiddleware,
  combineReducers,
  Store,
} from "redux";
import {
  persistReducer,
  persistStore,
  PersistConfig,
  Persistor,
} from "redux-persist";
import thunk from "redux-thunk";
import { AsyncStorage } from "react-native";
import * as Config from "../../config/config";
import { taskReducer } from "./task/reducer";
import { appSettingsReducer } from "./settings/reducer";
import { RootStateProps } from "./type";

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
  // TODO: Add assetion.
  whitelist: ["appSettings"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: Store<RootStateProps> = createStore(
  persistedReducer,
  applyMiddleware(thunk),
);
export const persistor: Persistor = persistStore(store);