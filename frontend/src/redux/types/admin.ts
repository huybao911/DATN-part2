import types from "redux/actions/types";
import { IUser } from "./user";
import { ISManager } from "./sManager";
import { IManager } from "./Manager";
import { IDepartment } from "./department"
import { IRole } from "./role"

export interface IAdmin {
  _id: any;
  username: string;
  password: string | null;
  role: any;
}

interface IAdminLoaded {
  type: typeof types.ADMIN_LOADED;
  payload: { getRole: IRole; admin: IAdmin };
}

interface IAdminRegisterSuccess {
  type: typeof types.ADMIN_REGISTER_SUCCESS;
  payload: { token: string; admin: IAdmin };
}

interface IAdminLoginSuccess {
  type: typeof types.ADMIN_LOGIN_SUCCESS;
  payload: { token: string; admin: IAdmin };
}

interface IAdminAddDepartmentSuccess {
  type: typeof types.ADMIN_ADDDEPARTMENT_SUCCESS;
  payload: {
    name: IDepartment;
    id: number;
  };
}

interface IGetUsers {
  type: typeof types.GET_USERS;
  payload: IUser[];
}

interface IGetDepartments {
  type: typeof types.GET_DEPARTMENTS;
  payload: IDepartment[];
}

interface IGetRoles {
  type: typeof types.GET_ROLES;
  payload: IRole[];
}

interface IUpdateUser {
  type: typeof types.UPDATE_USER;
  payload: {
    user: IUser;
    id: number;
  };
}

interface IDeleteUser {
  type: typeof types.DELETE_USER;
  payload: number;
}

interface IGetManager {
  type: typeof types.GET_MANAGER;
  payload: IManager[];
}

interface IUpdateManager {
  type: typeof types.UPDATE_MANAGER;
  payload: {
    user: IManager;
    id: number;
  };
}

interface IDeleteManager {
  type: typeof types.DELETE_MANAGER;
  payload: number;
}

interface IGetSManager {
  type: typeof types.GET_SMANAGER;
  payload: ISManager[];
}

interface IUpdateSManager {
  type: typeof types.UPDATE_SMANAGER;
  payload: {
    user: ISManager;
    id: number;
  };
}

interface IDeleteSManager {
  type: typeof types.DELETE_SMANAGER;
  payload: number;
}

interface IAdminAddDepartmentFail {
  type: typeof types.ADMIN_ADDDEPARTMENT_FAIL;
}

interface IAdminRegisterFail {
  type: typeof types.ADMIN_REGISTER_FAIL;
}

interface IAdminLoginFail {
  type: typeof types.ADMIN_LOGIN_FAIL;
}

interface IAdminAuthError {
  type: typeof types.ADMIN_AUTH_ERROR;
}

interface IAdminLogout {
  type: typeof types.ADMIN_LOGOUT;
}

export type AdminActions =
  | IAdminLoaded
  | IAdminLoginSuccess
  | IAdminRegisterSuccess
  | IAdminRegisterFail
  | IAdminLoginFail
  | IAdminAddDepartmentSuccess
  | IAdminAddDepartmentFail
  | IAdminAuthError
  | IAdminLogout
  | IGetUsers
  | IGetDepartments
  | IGetRoles
  | IUpdateUser
  | IDeleteUser
  | IGetManager
  | IUpdateManager
  | IDeleteManager
  | IGetSManager
  | IUpdateSManager
  | IDeleteSManager;

export interface IAdminState {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean | null;
  admin: IAdmin;
  getRole: IRole;
  smanager: ISManager[];
  manager: IManager[];
  users: IUser[];
  roles: IRole[];
  departments: IDepartment[];
}
