import types from "redux/actions/types";
import { IUser } from "redux/types/user";
import { IManager } from "redux/types/Manager";
import { ISManager } from "redux/types/sManager";
import { ISManagerState, SManagerActions } from "../types/sManager";
import { IRole } from "redux/types/role";
import { IPost } from "redux/types/post";

const initialState: ISManagerState = {
  token: localStorage.getItem("SManager__token"),
  loading: true,
  isAuthenticated: null,
  smanager: {} as ISManager,
  manager: [] as IManager[],
  users: [] as IUser[],
  posts: [] as IPost[],
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

    case types.GET_USERS:
      return {
        ...state,
        users: action.payload,
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
