import { Dispatch } from "redux";
import axios from "axios";
import types from "./types";
import { setUserAuthToken } from "utils/headers";
import { UserActions } from "redux/types/user";
import { AlertActions } from "redux/types/alert";
import { setAlert } from "./alert";
import { NumberSchema } from "yup";

const URI = "http://localhost:5000/api/v1/user";

// LOAD USER
export const loadUser = () => async (dispatch: Dispatch<UserActions>) => {
  if (localStorage.user__token) setUserAuthToken(localStorage.user__token);

  const config: any = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.get(`${URI}/auth-user`, config);
    dispatch({ type: types.USER_LOADED, payload: data });
  } catch (error) {
    dispatch({ type: types.USER_AUTH_ERROR });
  }
};

// LOGIN USER
export const loginUser =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<UserActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/login`, body, config);
        dispatch({
          type: types.USER_LOGIN_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Đăng nhập thành công!",
            status: 200,
            alertType: "success",
          })
        );
        dispatch<any>(loadUser());
      } catch (error: any) {
        dispatch({ type: types.USER_LOGIN_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Đăng nhập tài khoản User thất bại!",
            status: 200,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// REGISTER USER
export const registerUser =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<UserActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/register`, body, config);
        dispatch({
          type: types.USER_REGISTER_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản User thành công!",
            status: 200,
            alertType: "success",
          })
        );
        dispatch<any>(loadUser());
      } catch (error: any) {
        dispatch({ type: types.USER_REGISTER_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản User thất bại!",
            status: 200,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// LOGOUT USER
export const logOutUser =
  () => (dispatch: Dispatch<UserActions | AlertActions>) => {
    dispatch({ type: types.USER_LOGOUT });
    dispatch<any>(
      setAlert({
        msg: "Đăng xuất thành công!",
        status: 200,
        alertType: "success",
      })
    );
  };

// GET DEPARTMENTS
export const getDepartments =
  () => async (dispatch: Dispatch<UserActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/departments`, config);
      dispatch({ type: types.GET_DEPARTMENTS, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu khoa!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// GET POSTS
export const getPosts =
  () => async (dispatch: Dispatch<UserActions | AlertActions>) => {
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

// GET STORAGE POST
export const getPostStorage =
  () => async (dispatch: Dispatch<UserActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/postStorage`, config);
      dispatch({ type: types.GET_POSTSTORAGE, payload: data });
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

// STORAGE POST
export const storagePost =
  (id: NumberSchema) =>
    async (dispatch: Dispatch<UserActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/post/${id}`, config);
        dispatch({
          type: types.STORAGE_POST,
          payload: data,
        });
        // dispatch<any>(getPostStorage());
        // dispatch<any>(
        //   setAlert({
        //     msg: "Lưu post thành công!",
        //     status: 200,
        //     alertType: "success",
        //   })
        // );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi lưu post!",
            status: error.response.status,
            alertType: "error",
          })
        );
      }
    };

// UNSTORAGE POST
export const unstoragePost =
  (id: NumberSchema) =>
    async (dispatch: Dispatch<UserActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.delete(`${URI}/post/${id}`, config);
        dispatch({
          type: types.UNSTORAGE_POST,
          payload: data,
        });
        dispatch<any>(getPosts());
        dispatch<any>(
          setAlert({
            msg: "Bỏ lưu post thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi bỏ lưu post!",
            status: error.response.status,
            alertType: "error",
          })
        );
      }
    };

// UNSTORAGE POST IN LIST
export const unstoragePostInList =
  (id: NumberSchema) =>
    async (dispatch: Dispatch<UserActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.delete(`${URI}/post/${id}`, config);
        dispatch({
          type: types.UNSTORAGE_POST,
          payload: data,
        });
        dispatch<any>(getPostStorage());
        dispatch<any>(
          setAlert({
            msg: "Bỏ lưu post thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi bỏ lưu post!",
            status: error.response.status,
            alertType: "error",
          })
        );
      }
    };

// GET APPLY JOB POST
export const getPostApplyJob =
  () => async (dispatch: Dispatch<UserActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/postApply`, config);
      dispatch({ type: types.GET_POST_APPLY_JOB, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu post apply!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// APPLY JOB
export const applyJob =
  (id: NumberSchema) =>
    async (dispatch: Dispatch<UserActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/postApply/${id}`, config);
        dispatch({
          type: types.APPLY_JOB,
          payload: data,
        });
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi ứng tuyển!",
            status: error.response.status,
            alertType: "error",
          })
        );
      }
    };

// UNAPPLY JOB
export const unapplyJob =
  (id: NumberSchema) =>
    async (dispatch: Dispatch<UserActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.delete(`${URI}/postApply/${id}`, config);
        dispatch({
          type: types.UNAPPLY_JOB,
          payload: data,
        });
        dispatch<any>(getPosts());
        dispatch<any>(
          setAlert({
            msg: "Bỏ ứng tuyển thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi bỏ ứng tuyển!",
            status: error.response.status,
            alertType: "error",
          })
        );
      }
    };

// GET PROFILE
export const getProfile =
  () => async (dispatch: Dispatch<UserActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/profile`, config);
      dispatch({ type: types.GET_PROFILE, payload: data });
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

// UPDATE PROFILE
export const updateProfile =
  (body: any, id: number, setSubmitting: any) =>
    async (dispatch: Dispatch<UserActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.put(`${URI}/profile/${id}`, body, config);
        dispatch({
          type: types.UPDATE_PROFILE,
          payload: data,
        });
        dispatch<any>(getProfile());
        dispatch<any>(
          setAlert({
            msg: "Cập nhật thông tin thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi cập nhật thông tin!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };
