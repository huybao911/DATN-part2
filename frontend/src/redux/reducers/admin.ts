import types from "redux/actions/types";
import { IAdmin } from "redux/types/admin";
import { IUser } from "redux/types/user";
import { ISManager } from "redux/types/sManager";
import { IManager } from "redux/types/Manager";
import { IDepartment } from "redux/types/department";
import { IRole } from "redux/types/role";
import { IAdminState, AdminActions } from "../types/admin";

const initialState: IAdminState = {
  token: localStorage.getItem("admin__token"),
  loading: true,
  isAuthenticated: null,
  admin: {} as IAdmin,
  sManager: [] as ISManager[],
  Manager: [] as IManager[],
  departments: [] as IDepartment[],
  roles: [] as IRole[],
  users: [] as IUser[],
};

const adminReducer = (
  state = initialState,
  action: AdminActions
): IAdminState => {
  switch (action.type) {
    case types.ADMIN_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        admin: action.payload,
      };

    case types.ADMIN_ADDDEPARTMENT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case types.ADMIN_LOGIN_SUCCESS:
      localStorage.setItem("admin__token", action.payload.token);
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

    case types.GET_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
      };
    case types.GET_ROLES:
      return {
        ...state,
        roles: action.payload,
      };

    case types.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    case types.UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload.id ? { ...action.payload.user } : user
        ),
      };

    case types.GET_MANAGER:
      return {
        ...state,
        Manager: action.payload,
      };

    case types.DELETE_MANAGER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    case types.UPDATE_MANAGER:
      return {
        ...state,
        Manager: state.Manager.map((user) =>
          user._id === action.payload.id ? { ...action.payload.user } : user
        ),
      };


    case types.GET_SMANAGER:
      return {
        ...state,
        sManager: action.payload,
      };

    case types.DELETE_SMANAGER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    case types.UPDATE_SMANAGER:
      return {
        ...state,
        sManager: state.users.map((user) =>
          user._id === action.payload.id ? { ...action.payload.user } : user
        ),
      };

    case types.ADMIN_ADDDEPARTMENT_FAIL:
    case types.ADMIN_LOGIN_FAIL:
    case types.ADMIN_REGISTER_FAIL:
    case types.ADMIN_AUTH_ERROR:
    case types.ADMIN_LOGOUT:
      localStorage.removeItem("admin__token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        admin: {} as IAdmin,
        users: [],
      };

    default:
      return state;
  }
};

export default adminReducer;
