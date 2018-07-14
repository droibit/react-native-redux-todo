import { 
  createStore, 
  applyMiddleware,
  combineReducers,
 } from "redux";
import thunk from "redux-thunk";
import { 
  persistReducer, 
  persistStore, 
  PersistConfig,
} from "redux-persist";
import { AsyncStorage } from "react-native";
import * as Config from "../../config/config";

import taskReducer from "./task/reducer";

const { KEY_SETTINGS } = Config.Storage;

const persistConfig: PersistConfig = {
  key: KEY_SETTINGS,
  storage: AsyncStorage,
  whitelist: ["settings"],
};

const rootReducer = combineReducers({
  "task": taskReducer,
});

//persistReducer()

// export const reducers = combi