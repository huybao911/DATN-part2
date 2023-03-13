import types from "redux/actions/types";
import { IUser } from "redux/types/user";
import { IManager } from "redux/types/Manager";
import { IManagerState, ManagerActions } from "../types/Manager";

const initialState: IManagerState = {
  token: localStorage.getItem("Manager__token"),
  loading: true,
  isAuthenticated: null,
  Manager: {} as IManager,
  users: [] as IUser[],
};

const ManagerReducer = (
  state = initialState,
  action: ManagerActions
): IManagerState => {
  switch (action.type) {
    case types.MANAGER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        Manager: action.payload,
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
        Manager: {} as IManager,
        users: [],
      };

    default:
      return state;
  }
};

export default ManagerReducer;
