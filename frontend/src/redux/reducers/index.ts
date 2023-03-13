import { combineReducers } from "redux";
import admin from "./admin";
import SManager from "./sManager";
import Manager from "./Manager";
import user from "./user";

import alert from "./alert";

const rootReducer = combineReducers({
  admin,
  SManager,
  Manager,
  user,
  alert,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
