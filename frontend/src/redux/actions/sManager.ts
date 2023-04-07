import axios from "axios";
import { Dispatch } from "redux";
import { setSManagerAuthToken } from "utils/headers";
import { setAlert } from "./alert";
import { SManagerActions, SManagerAdminActions } from "redux/types/sManager";
import { AlertActions } from "redux/types/alert";
import types from "./types";

const URI = "http://localhost:5000/api/v1/smanager";
const USER_URI = "http://localhost:5000/api/v1/user";

// LOAD SMANAGER
export const loadSManager = () => async (dispatch: Dispatch<SManagerActions>) => {
  if (localStorage.SManager__token)
    setSManagerAuthToken(localStorage.SManager__token);
  const config: any = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.get(`${URI}/auth-SManager`, config);

    dispatch({ type: types.SMANAGER_LOADED, payload: data });
  } catch (error) {
    dispatch({ type: types.SMANAGER_AUTH_ERROR });
  }
};

// LOGIN SMANAGER
export const loginSManager =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<SManagerActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/login`, body, config);
        dispatch({
          type: types.SMANAGER_LOGIN_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Đăng nhập tài khoản Quản Lý Cấp Cao thành công!",
            status: 200,
            alertType: "success",
          })
        );
        dispatch<any>(loadSManager());
      } catch (error: any) {
        dispatch({ type: types.SMANAGER_LOGIN_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Đăng nhập tài khoản Quản Lý Cấp Cao thất bại!",
            status: 200,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// REGISTER SMANAGER
export const registerSManager =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<SManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${USER_URI}/register`, body, config);
        dispatch({
          type: types.SMANAGER_REGISTER_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản Quản Lý Cấp Cao thành công!",
            status: 200,
            alertType: "success",
          })
        );
        dispatch<any>(loadSManager());
      } catch (error: any) {
        dispatch({ type: types.SMANAGER_REGISTER_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản Quản Lý Cấp Cao thất bại!",
            status: 200,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// REGISTER SMANAGER ADMIN
export const registerSManagerAdmin =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<SManagerAdminActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${USER_URI}/register`, body, config);
        dispatch({
          type: types.SMANAGER_REGISTER_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản Quản Lý Cấp Cao thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch({ type: types.SMANAGER_REGISTER_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản Quản Lý Cấp Cao thất bại!",
            status: 200,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };
// GET USER
export const getUser =
  () => async (dispatch: Dispatch<SManagerActions | AlertActions>) => {
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
// GET USERS
export const getUsers =
  () => async (dispatch: Dispatch<SManagerActions | AlertActions>) => {
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

// GET DEPARTMENTS
export const getDepartments =
  () => async (dispatch: Dispatch<SManagerActions | AlertActions>) => {
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

//GET_POSTAPPROVE_SMANAGER
export const getPostApprove =
  () => async (dispatch: Dispatch<SManagerActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/postApprove`, config);
      dispatch({ type: types.GET_POSTAPPROVE_SMANAGER, payload: data });
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
// APPROVE POST
export const approvePost =
  (body: any, id: number, setSubmitting: any) =>
    async (dispatch: Dispatch<SManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.patch(`${URI}/post/${id}`, body, config);
        dispatch({
          type: types.APPROVE_POSTER,
          payload: data,
        });
        dispatch<any>(getPostApprove());
        dispatch<any>(
          setAlert({
            msg: "Duyệt post thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi duyệt post!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// GET EVENTS
export const getEvents =
  () => async (dispatch: Dispatch<SManagerActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/events`, config);
      dispatch({ type: types.GET_EVENTS, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu events!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// CREATE EVENT
export const createEvent =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<SManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/createEvent`, body, config);
        dispatch({
          type: types.CREATE_EVENT_SUCCESS,
          payload: data,
        });
        // dispatch<any>(loadManager());
        dispatch<any>(
          setAlert({
            msg: "Thêm event thành công!",
            status: 200,
            alertType: "success",
          })
        );
        dispatch<any>(loadSManager());
      } catch (error: any) {
        dispatch({ type: types.CREATE_EVENT_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Thêm event thất bại!",
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

// UPDATE EVENT
export const updateEvent =
  (body: any, id: number, setSubmitting: any) =>
    async (dispatch: Dispatch<SManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.patch(`${URI}/event/${id}`, body, config);
        dispatch({
          type: types.UPDATE_EVENT,
          payload: data,
        });
        dispatch<any>(getEvents());
        dispatch<any>(
          setAlert({
            msg: "Cập nhật event thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi cập nhật event!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// DELETE EVENT
export const deleteEvent =
  (id: number) => async (dispatch: Dispatch<SManagerActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(`${URI}/event/${id}`, config);
      dispatch({ type: types.DELETE_EVENT, payload: id });
      dispatch<any>(loadSManager());
      dispatch<any>(
        setAlert({
          msg: "Xóa event thành công!",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi xóa event!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// GET JOBEVENTS
export const getJobEvents =
  () => async (dispatch: Dispatch<SManagerActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/jobEvents`, config);
      dispatch({ type: types.GET_JOBEVENTS, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu jobevents!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// CREATE JOBEVENT
export const createJobEvent =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<SManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/createJobEvent`, body, config);
        dispatch({
          type: types.CREATE_JOBEVENT_SUCCESS,
          payload: data,
        });
        // dispatch<any>(loadManager());
        dispatch<any>(
          setAlert({
            msg: "Thêm jobevent thành công!",
            status: 200,
            alertType: "success",
          })
        );
        dispatch<any>(loadSManager());
      } catch (error: any) {
        dispatch({ type: types.CREATE_JOBEVENT_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Thêm jobevent thất bại!",
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

// UPDATE JOBEVENT
export const updateJobEvent =
  (body: any, id: number, setSubmitting: any) =>
    async (dispatch: Dispatch<SManagerActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.patch(`${URI}/jobEvent/${id}`, body, config);
        dispatch({
          type: types.UPDATE_JOBEVENT,
          payload: data,
        });
        dispatch<any>(getJobEvents());
        dispatch<any>(
          setAlert({
            msg: "Cập nhật jobevent thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi cập nhật jobevent!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// DELETE JOBEVENT
export const deleteJobEvent =
  (id: number) => async (dispatch: Dispatch<SManagerActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(`${URI}/jobEvent/${id}`, config);
      dispatch({ type: types.DELETE_JOBEVENT, payload: id });
      dispatch<any>(loadSManager());
      dispatch<any>(
        setAlert({
          msg: "Xóa jobevent thành công!",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi xóa jobevent!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// LOGOUT SMANAGER
export const logOutSManager =
  () => (dispatch: Dispatch<SManagerActions | AlertActions>) => {
    dispatch({ type: types.SMANAGER_LOGOUT });
    dispatch<any>(
      setAlert({
        msg: "Đăng xuất thành công!",
        status: 200,
        alertType: "success",
      })
    );
  };
