import types from "redux/actions/types";
import { IUser } from "redux/types/user";
import { IManager } from "redux/types/Manager";
import { ISManager } from "redux/types/sManager";
import { ISManagerState, SManagerActions } from "../types/sManager";
import { IRole } from "redux/types/role";
import { IDepartment } from "redux/types/department";
import { IPost } from "redux/types/post";
import { IEvent } from "redux/types/event";
import { IJobEvent } from "redux/types/jobEvent";

const initialState: ISManagerState = {
  token: localStorage.getItem("SManager__token"),
  loading: true,
  isAuthenticated: null,
  smanager: {} as ISManager,
  manager: [] as IManager[],
  users: [] as IUser[],
  departments: [] as IDepartment[],
  posts: [] as IPost[],
  events: [] as IEvent[],
  jobevents: [] as IJobEvent[],
  getRole: {} as IRole,
};

const sManagerReducer = (
  state = initialState,
  action: SManagerActions
): ISManagerState => {
  switch (action.type) {
    case types.SMANAGER_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case types.SMANAGER_LOGIN_SUCCESS:
      localStorage.setItem("SManager__token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case types.SMANAGER_REGISTER_SUCCESS:
      localStorage.setItem("SManager__token", action.payload.token);
      localStorage.removeItem("SManager__token");
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case types.GET_USER:
      return {
        ...state,
        users: action.payload,
      };
    case types.GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case types.GET_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
      };

    case types.GET_POSTAPPROVE_SMANAGER:
      return {
        ...state,
        posts: action.payload,
      };
    case types.APPROVE_POSTER:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id ? { ...action.payload.post } : post
        ),
      };
    case types.GET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };

    case types.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case types.UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload.id ? { ...action.payload.post } : event
        ),
      };

    case types.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event._id !== action.payload),
      };

    case types.GET_JOBEVENTS:
      return {
        ...state,
        jobevents: action.payload,
      };

    case types.CREATE_JOBEVENT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case types.UPDATE_JOBEVENT:
      return {
        ...state,
        jobevents: state.jobevents.map((jobevent) =>
          jobevent._id === action.payload.id ? { ...action.payload.post } : jobevent
        ),
      };

    case types.DELETE_JOBEVENT:
      return {
        ...state,
        jobevents: state.jobevents.filter((jobevent) => jobevent._id !== action.payload),
      };

    case types.SMANAGER_LOGIN_FAIL:
    case types.SMANAGER_REGISTER_FAIL:
    case types.SMANAGER_AUTH_ERROR:
    case types.SMANAGER_LOGOUT:
      localStorage.removeItem("SManager__token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        smanager: {} as ISManager,
        users: [],
      };

    default:
      return state;
  }
};

export default sManagerReducer;
