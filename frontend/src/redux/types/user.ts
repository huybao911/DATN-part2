import types from "redux/actions/types";
import { IDepartment } from "./department";
import { IRole } from "./role";

export interface IUser {
  _id: any;
  username: string;
  email: string;
  password: string | null;
  department:any;
  role: any;
  date: string;
}

interface IUserLoaded {
  type: typeof types.USER_LOADED;
  payload: { getRole: IRole; user: IUser };
}

interface IUserRegisterSuccess {
  type: typeof types.USER_REGISTER_SUCCESS;
  payload: { token: string; user: IUser };
}

interface IUserLoginSuccess {
  type: typeof types.USER_LOGIN_SUCCESS;
  payload: { token: string; user: IUser };
}

interface IUserLoginFail {
  type: typeof types.USER_LOGIN_FAIL;
}

interface IGetDepartments {
  type: typeof types.GET_DEPARTMENTS;
  payload: IDepartment[];
}

interface IUserRegisterFail {
  type: typeof types.USER_REGISTER_FAIL;
}

interface IUserAuthError {
  type: typeof types.USER_AUTH_ERROR;
}

interface IUserLogout {
  type: typeof types.USER_LOGOUT;
}

export type UserActions =
  | IUserLoaded
  | IUserLoginSuccess
  | IUserLoginFail
  | IUserRegisterSuccess
  | IUserRegisterFail
  | IUserAuthError
  | IGetDepartments
  | IUserLogout;

export interface IUserState {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean | null;
  user: IUser;
  getRole: IRole;
  departments: IDepartment[];
}
