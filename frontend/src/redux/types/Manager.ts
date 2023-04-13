import types from "redux/actions/types";
import { IUser } from "./user";
import { IRole } from "./role";
import { IDepartment } from "./department";
import { IPost } from "./post";
import { IApplyJob } from "./applyJob";
import { IEvent } from "./event";
import { IJobEvent } from "./jobEvent";

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

interface IGetUser {
  type: typeof types.GET_USER;
  payload: IUser[];
}

interface IGetPost {
  type: typeof types.GET_POST;
  payload: IPost[];
}

interface IGetPosts {
  type: typeof types.GET_POSTS;
  payload: IPost[];
}

interface IGetPostUserApplys {
  type: typeof types.GET_POST_USERAPPLY;
  payload: IApplyJob[];
}

interface ICreatePostSuccess {
  type: typeof types.CREATE_POSTER_SUCCESS;
  payload: {
    manager: IManager;
    id: number;
  };
}

interface IUpdatePost {
  type: typeof types.UPDATE_POSTER;
  payload: {
    post: IPost;
    id: number;
  };
}

interface IDeletePost {
  type: typeof types.DELETE_POSTER;
  payload: number;
}

interface IGetEvents {
  type: typeof types.GET_EVENTS;
  payload: IEvent[];
}

interface IGetJobEvents {
  type: typeof types.GET_JOBEVENTS;
  payload: IJobEvent[];
}

interface IManagerRegisterFail {
  type: typeof types.MANAGER_REGISTER_FAIL;
}

interface IManagerLoginFail {
  type: typeof types.MANAGER_LOGIN_FAIL;
}

interface ICreatePostFail {
  type: typeof types.CREATE_POSTER_FAIL;
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
  | IGetUsers
  | IGetUser
  | IGetPost
  | IGetPosts
  | IGetPostUserApplys
  | ICreatePostSuccess
  | ICreatePostFail
  | IUpdatePost
  | IDeletePost
  | IGetEvents
  | IGetJobEvents;

export type ManagerAdminActions =
| IManagerRegisterSuccess
| IManagerRegisterFail;

export interface IManagerState {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean | null;
  getRole: IRole;
  getDepartment: IDepartment;
  manager: IManager;
  users: IUser[];
  posts: IPost[];
  events: IEvent[];
  jobevents: IJobEvent[];
  appyjobs: IApplyJob[];
}
