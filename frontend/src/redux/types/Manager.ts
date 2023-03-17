import types from "redux/actions/types";
import { IUser } from "./user";
import { IRole } from "./role";

export interface IManager {
  _id: any;
  username: string;
  password: string | null;
  role: any;
}

interface IManagerLoaded {
  type: typeof types.MANAGER_LOADED;
  payload: { getRole: IRole; manager: IManager };
}

interface IManagerRegisterSuccess {
  type: typeof types.MANAGER_REGISTER_SUCCESS;
  payload: { token: string; manager: IManager };
}

interface IManagerLoginSuccess {
  type: typeof types.MANAGER_LOGIN_SUCCESS;
  payload: { token: string; manager: IManager };
}

interface IGetUsers {
  type: typeof types.GET_USERS;
  payload: IUser[];
}

interface IManagerRegisterFail {
  type: typeof types.MANAGER_REGISTER_FAIL;
}

interface IManagerLoginFail {
  type: typeof types.MANAGER_LOGIN_FAIL;
}

interface IManagerAuthError {
  type: typeof types.MANAGER_AUTH_ERROR;
}

interface IManagerLogout {
  type: typeof types.MANAGER_LOGOUT;
}

export type ManagerActions =
  | IManagerLoaded
  | IManagerLoginSuccess
  | IManagerRegisterSuccess
  | IManagerRegisterFail
  | IManagerLoginFail
  | IManagerAuthError
  | IManagerLogout
  | IGetUsers;

export type ManagerAdminActions =
| IManagerRegisterSuccess
| IManagerRegisterFail;

export interface IManagerState {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean | null;
  getRole: IRole;
  manager: IManager;
  users: IUser[];
}
