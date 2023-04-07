import types from "redux/actions/types";
import { IUserState, UserActions } from "../types/user";
import { IUser } from "redux/types/user";
import { IRole } from "redux/types/role";
import { IDepartment } from "redux/types/department";
import { IPost } from "redux/types/post";
import { IPostStorage } from "redux/types/postStorage";
import { IApplyJob } from "redux/types/applyJob";

const initialState: IUserState = {
  token: localStorage.getItem("user__token"),
  loading: true,
  isAuthenticated: null,
  user: {} as IUser,
  getRole: {} as IRole,
  getDepartment: {} as IDepartment,
  users: [] as IUser[],
  posts: [] as IPost[],
  postStorages: [] as IPostStorage[],
  applyJobs: [] as IApplyJob[],
  departments: [] as IDepartment[],
};

const userReducer = (state = initialState, action: UserActions): IUserState => {
  switch (action.type) {
    case types.USER_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case types.USER_REGISTER_SUCCESS:
      localStorage.setItem("user__token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case types.USER_LOGIN_SUCCESS:
      localStorage.setItem("user__token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case types.GET_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
      };
    case types.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case types.GET_POSTSTORAGE:
      return {
        ...state,
        postStorages: action.payload,
      };
    case types.STORAGE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id ? { ...action.payload.post } : post
        ),
      };
    case types.UNSTORAGE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id ? { ...action.payload.post } : post
        ),
      };
    case types.GET_POST_APPLY_JOB:
      return {
        ...state,
        applyJobs: action.payload,
      };
    case types.APPLY_JOB:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id ? { ...action.payload.post } : post
        ),
      };
    case types.UNAPPLY_JOB:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id ? { ...action.payload.post } : post
        ),
      };
    case types.GET_PROFILE:
      return {
        ...state,
        users: action.payload,
      };
    case types.UPDATE_PROFILE:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload.id ? { ...action.payload.user } : user
        ),
      };

    case types.USER_REGISTER_FAIL:
    case types.USER_LOGIN_FAIL:
    case types.USER_AUTH_ERROR:
    case types.USER_LOGOUT:
      localStorage.removeItem("user__token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: {} as IUser,
      };

    default:
      return state;
  }
};

export default userReducer;
