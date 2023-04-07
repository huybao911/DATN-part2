import types from "redux/actions/types";
import { IDepartment } from "./department";
import { IRole } from "./role";
import { IPost } from "./post";
import { IPostStorage } from "./postStorage";
import { IApplyJob } from "./applyJob";

export interface IUser {
  _id: any;
  username: string;
  email: string;
  password: string | null;
  department: any;
  role: any;
  date: string;
  fullName: string;
  birthday: string;
  mssv: string;
  classUser: string;
  phone: string;
  address: string;
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

interface IGetPosts {
  type: typeof types.GET_POSTS;
  payload: IPost[];
}

interface IGetPostStorage {
  type: typeof types.GET_POSTSTORAGE;
  payload: IPostStorage[];
}

interface storagePost {
  type: typeof types.STORAGE_POST;
  payload: {
    post: IPost;
    id: number;
  };
}
interface unstoragePost {
  type: typeof types.UNSTORAGE_POST;
  payload: {
    post: IPost;
    id: number;
  };
}

interface storagePost {
  type: typeof types.STORAGE_POST;
  payload: {
    post: IPost;
    id: number;
  };
}
interface unstoragePost {
  type: typeof types.UNSTORAGE_POST;
  payload: {
    post: IPost;
    id: number;
  };
}

interface IGetPostApplyJob {
  type: typeof types.GET_POST_APPLY_JOB;
  payload: IPostStorage[];
}
interface applyJob {
  type: typeof types.APPLY_JOB;
  payload: {
    post: IPost;
    id: number;
  };
}
interface unapplyJob {
  type: typeof types.UNAPPLY_JOB;
  payload: {
    post: IPost;
    id: number;
  };
}

interface IGetProfile {
  type: typeof types.GET_PROFILE;
  payload: IUser[];
}
interface IUpdateProfile {
  type: typeof types.UPDATE_PROFILE;
  payload: {
    user: IUser;
    id: number;
  };
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
  | IGetPosts
  | IGetPostStorage
  | storagePost
  | unstoragePost
  | IGetPostApplyJob
  | applyJob
  | unapplyJob
  | IGetProfile
  | IUpdateProfile
  | IUserLogout;

export interface IUserState {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean | null;
  user: IUser;
  getRole: IRole;
  getDepartment: IDepartment;
  departments: IDepartment[];
  posts: IPost[];
  postStorages: IPostStorage[];
  applyJobs: IApplyJob[];
  users: IUser[];
}
