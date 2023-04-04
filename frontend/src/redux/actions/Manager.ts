import axios from "axios";
import { Dispatch } from "redux";
import { setManagerAuthToken } from "utils/headers";
import { setAlert } from "./alert";
import { ManagerActions, ManagerAdminActions } from "redux/types/Manager";
import { AlertActions } from "redux/types/alert";
import types from "./types";

const URI = "http://localhost:5000/api/v1/manager";
const USER_URI = "http://localhost:5000/api/v1/user";

// LOAD MANAGER
export const loadManager = () => async (dispatch: Dispatch<ManagerActions>) => {
  if (localStorage.Manager__token)
    setManagerAuthToken(localStorage.Manager__token);
  const config: any = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.get(`${URI}/auth-Manager`, config);

    dispatch({ type: types.MANAGER_LOADED, payload: data });
  } catch (error) {
    dispatch({ type: types.MANAGER_AUTH_ERROR });
  }
};

// LOGIN MANAGER
export const loginManager =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<ManagerActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/login`, body, config);
        dispatch({
          type: types.MANAGER_LOGIN_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Đăng nhập tài khoản Quản Lý thành công!",
            status: 200,
            alertType: "success",
          })
        );
        dispatch<any>(loadManager());
      } catch (error: any) {
        dispatch({ type: types.MANAGER_LOGIN_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Đăng nhập tài khoản Quản Lý thất bại!",
            status: 200,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// REGISTER MANAGER
export const registerManager =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${USER_URI}/register`, body, config);
        dispatch({
          type: types.MANAGER_REGISTER_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản Quản Lý thành công!",
            status: 200,
            alertType: "success",
          })
        );
        dispatch<any>(loadManager());
      } catch (error: any) {
        dispatch({ type: types.MANAGER_REGISTER_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản Quản Lý thất bại!",
            status: 200,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// REGISTER MANAGER ADMIN
export const registerManagerAdmin =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<ManagerAdminActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${USER_URI}/register`, body, config);
        dispatch({
          type: types.MANAGER_REGISTER_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản Quản Lý thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch({ type: types.MANAGER_REGISTER_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản Quản Lý thất bại!",
            status: 200,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// GET USERS
export const getUsers =
  () => async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/users`, config);
      dispatch({ type: types.GET_USERS, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu người dùng!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// GET USER
export const getUser =
  () => async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/user`, config);
      dispatch({ type: types.GET_USER, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu người dùng!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// GET POST
export const getPost =
  () => async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/post`, config);
      dispatch({ type: types.GET_POST, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu post!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// GET POSTS
export const getPosts =
  () => async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/posts`, config);
      dispatch({ type: types.GET_POSTS, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu posts!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// CREATE POST
export const createPost =
  (body: any, id: number, setSubmitting: any) =>
    async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/createPost/${id}`, body, config);
        dispatch({
          type: types.CREATE_POSTER_SUCCESS,
          payload: data,
        });
        // dispatch<any>(loadManager());
        dispatch<any>(
          setAlert({
            msg: "Thêm post thành công!",
            status: 200,
            alertType: "success",
          })
        );
        dispatch<any>(loadManager());
      } catch (error: any) {
        dispatch({ type: types.CREATE_POSTER_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Thêm post thất bại!",
            status: 200,
            // msg: error.response.data,
            // status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// UPDATE POST
export const updatePost =
  (body: any, id: number, setSubmitting: any) =>
    async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.patch(`${URI}/post/${id}`, body, config);
        dispatch({
          type: types.UPDATE_POSTER,
          payload: data,
        });
        dispatch<any>(getPosts());
        dispatch<any>(
          setAlert({
            msg: "Cập nhật post thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi cập nhật post!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// DELETE USER
export const deleteUser =
  (id: number) => async (dispatch: Dispatch<ManagerActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(`${URI}/post/${id}`, config);
      dispatch({ type: types.DELETE_POSTER, payload: id });
      dispatch<any>(loadManager());
      dispatch<any>(
        setAlert({
          msg: "Xóa post thành công!",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi xóa post!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// LOGOUT MANAGER
export const logOutManager =
  () => (dispatch: Dispatch<ManagerActions | AlertActions>) => {
    dispatch({ type: types.MANAGER_LOGOUT });
    dispatch<any>(
      setAlert({
        msg: "Đăng xuất thành công!",
        status: 200,
        alertType: "success",
      })
    );
  };
