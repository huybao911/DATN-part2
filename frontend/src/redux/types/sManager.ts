import types from "redux/actions/types";
import { IUser } from "./user";
import { IManager } from "./Manager";
import { IRole } from "./role";

export interface ISManager {
  _id: any;
  username: string;
  password: string | null;
  role: any;
}

interface ISManagerLoaded {
  type: typeof types.SMANAGER_LOADED;
  payload: { getRole: IRole; smanager: ISManager };
}

interface ISManagerRegisterSuccess {
  type: typeof types.SMANAGER_REGISTER_SUCCESS;
  payload: { token: string; smanager: ISManager };
}

interface ISManagerLoginSuccess {
  type: typeof types.SMANAGER_LOGIN_SUCCESS;
  payload: { token: string; smanager: ISManager };
}

interface IGetUsers {
  type: typeof types.GET_USERS;
  payload: IUser[];
}

interface ISManagerRegisterFail {
  type: typeof types.SMANAGER_REGISTER_FAIL;
}

interface ISManagerLoginFail {
  type: typeof types.SMANAGER_LOGIN_FAIL;
}

interface ISManagerAuthError {
  type: typeof types.SMANAGER_AUTH_ERROR;
}

interface ISManagerLogout {
  type: typeof types.SMANAGER_LOGOUT;
}

export type SManagerActions =
  | ISManagerLoaded
  | ISManagerLoginSuccess
  | ISManagerRegisterSuccess
  | ISManagerRegisterFail
  | ISManagerLoginFail
  | ISManagerAuthError
  | ISManagerLogout
  | IGetUsers


export type SManagerAdminActions =
| ISManagerRegisterSuccess
| ISManagerRegisterFail;

export interface ISManagerState {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean | null;
  smanager: ISManager;
  getRole: IRole;
  manager: IManager[];
  users: IUser[];
}
