import types from "redux/actions/types";
import { IUser } from "redux/types/user";
import { IManager } from "redux/types/Manager";
import { ISManager } from "redux/types/sManager";
import { ISManagerState, SManagerActions } from "../types/sManager";

const initialState: ISManagerState = {
  token: localStorage.getItem("SManager__token"),
  loading: true,
  isAuthenticated: null,
  SManager: {} as ISManager,
  Manager: [] as IManager[],
  users: [] as IUser[],
};

const sManagerReducer = (
  state = initialState,
  action: SManagerActions
): ISManagerState => {
  switch (action.type) {
    case types.SMANAGER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        SManager: action.payload,
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
        SManager: {} as ISManager,
        users: [],
      };

    default:
      return state;
  }
};

export default sManagerReducer;
