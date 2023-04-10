import types from "redux/actions/types";
import { IUser } from "./user";
import { IManager } from "./Manager";
import { IRole } from "./role";
import { IDepartment } from "./department";
import { IPost } from "./post";
import { IEvent } from "./event";
import { IJobEvent } from "./jobEvent";

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

interface IGetUser {
  type: typeof types.GET_USER;
  payload: IUser[];
}

interface IGetDepartments {
  type: typeof types.GET_DEPARTMENTS;
  payload: IDepartment[];
}

interface IGetPostApprove {
  type: typeof types.GET_POSTAPPROVE_SMANAGER;
  payload: IPost[];
}

interface IApprovePost {
  type: typeof types.APPROVE_POSTER;
  payload: {
    post: IPost;
    id: number;
  };
}

interface ICommentPost {
  type: typeof types.COMMENT_POST;
  payload: {
    post: IPost;
    id: number;
  };
}

interface IDeleteComment {
  type: typeof types.DELETE_COMMENT;
   payload: {
    post: IPost;
    id: number;
  };
}

interface IGetEvents {
  type: typeof types.GET_EVENTS;
  payload: IEvent[];
}

interface ICreateEventSuccess {
  type: typeof types.CREATE_EVENT_SUCCESS;
  payload: IEvent[];
}

interface IUpdateEvent {
  type: typeof types.UPDATE_EVENT;
  payload: {
    post: IEvent;
    id: number;
  };
}

interface IDeleteEvent {
  type: typeof types.DELETE_EVENT;
  payload: number;
}

interface IGetJobEvents {
  type: typeof types.GET_JOBEVENTS;
  payload: IJobEvent[];
}

interface ICreateJobEventSuccess {
  type: typeof types.CREATE_JOBEVENT_SUCCESS;
  payload: IJobEvent[];
}

interface IUpdateJobEvent {
  type: typeof types.UPDATE_JOBEVENT;
  payload: {
    post: IJobEvent;
    id: number;
  };
}

interface IDeleteJobEvent {
  type: typeof types.DELETE_JOBEVENT;
  payload: number;
}

interface ICreateEventFail {
  type: typeof types.CREATE_EVENT_FAIL;
}

interface ICreateJobEventFail {
  type: typeof types.CREATE_JOBEVENT_FAIL;
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
  | IGetUser
  | IGetUsers
  | IGetDepartments
  | IGetPostApprove
  | IApprovePost
  | ICommentPost
  | IDeleteComment
  | IGetEvents
  | ICreateEventSuccess
  | ICreateEventFail
  | IUpdateEvent
  | IDeleteEvent
  | IGetJobEvents
  | ICreateJobEventSuccess
  | ICreateJobEventFail
  | IUpdateJobEvent
  | IDeleteJobEvent;

export type SManagerAdminActions =
| ISManagerRegisterSuccess
| ISManagerRegisterFail;

export interface ISManagerState {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean | null;
  smanager: ISManager;
  departments: IDepartment[];
  getRole: IRole;
  manager: IManager[];
  users: IUser[];
  posts: IPost[];
  events: IEvent[];
  jobevents: IJobEvent[];
}
