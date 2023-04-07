import types from "redux/actions/types";
import { IUser } from "redux/types/user";
import { IManager } from "redux/types/Manager";
import { IManagerState, ManagerActions } from "../types/Manager";
import { IRole } from "redux/types/role";
import { IPost } from "redux/types/post";
import { IApplyJob } from "redux/types/applyJob";
import { IEvent } from "redux/types/event";

const initialState: IManagerState = {
  token: localStorage.getItem("Manager__token"),
  loading: true,
  isAuthenticated: null,
  manager: {} as IManager,
  users: [] as IUser[],
  posts: [] as IPost[],
  appyjobs: [] as IApplyJob[],
  events: [] as IEvent[],
  getRole: {} as IRole,
};

const ManagerReducer = (
  state = initialState,
  action: ManagerActions
): IManagerState => {
  switch (action.type) {
    case types.MANAGER_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case types.MANAGER_LOGIN_SUCCESS:
      localStorage.setItem("Manager__token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case types.MANAGER_REGISTER_SUCCESS:
      localStorage.setItem("Manager__token", action.payload.token);
      localStorage.removeItem("Manager__token");
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case types.GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case types.GET_USER:
      return {
        ...state,
        users: action.payload,
      };
    case types.GET_POST:
      return {
        ...state,
        posts: action.payload,
      };
    case types.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case types.GET_POST_USERAPPLY:
      return {
        ...state,
        appyjobs: action.payload,
      };
    case types.CREATE_POSTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case types.DELETE_POSTER:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    case types.UPDATE_POSTER:
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

    case types.CREATE_POSTER_FAIL:
    case types.MANAGER_LOGIN_FAIL:
    case types.MANAGER_REGISTER_FAIL:
    case types.MANAGER_AUTH_ERROR:
    case types.MANAGER_LOGOUT:
      localStorage.removeItem("Manager__token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        manager: {} as IManager,
        users: [],
      };

    default:
      return state;
  }
};

export default ManagerReducer;
