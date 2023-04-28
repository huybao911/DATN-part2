enum ActionTypes {
  SET_ALERT = "SET_ALERT",
  REMOVE_ALERT = "REMOVE_ALERT",
  USER_LOADED = "USER_LOADED",
  USER_AUTH_ERROR = "USER_AUTH_ERROR",
  USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS",
  USER_REGISTER_FAIL = "USER_REGISTER_FAIL",
  USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL = "USER_LOGIN_FAIL",
  USER_LOGOUT = "USER_LOGOUT",
  ADMIN_LOADED = "ADMIN_LOADED",
  ADMIN_AUTH_ERROR = "ADMIN_AUTH_ERROR",
  ADMIN_REGISTER_SUCCESS = "ADMIN_REGISTER_SUCCESS",
  ADMIN_REGISTER_FAIL = "ADMIN_REGISTER_FAIL",
  ADMIN_LOGIN_SUCCESS = "ADMIN_LOGIN_SUCCESS",
  ADMIN_LOGIN_FAIL = "ADMIN_LOGIN_FAIL",
  ADMIN_ADDDEPARTMENT_SUCCESS = "ADMIN_ADDDEPARTMENT_SUCCESS",
  ADMIN_ADDDEPARTMENT_FAIL = "ADMIN_ADDDEPARTMENT_FAIL",
  ADMIN_LOGOUT = "ADMIN_LOGOUT",
  SMANAGER_LOADED = "SMANAGER_LOADED",
  SMANAGER_AUTH_ERROR = "SMANAGER_AUTH_ERROR",
  SMANAGER_REGISTER_SUCCESS = "SMANAGER_REGISTER_SUCCESS",
  SMANAGER_REGISTER_FAIL = "SMANAGER_REGISTER_FAIL",
  SMANAGER_LOGIN_SUCCESS = "SMANAGER_LOGIN_SUCCESS",
  SMANAGER_LOGIN_FAIL = "SMANAGER_LOGIN_FAIL",
  SMANAGER_LOGOUT = "SMANAGER_LOGOUT",
  MANAGER_LOADED = "MANAGER_LOADED",
  MANAGER_AUTH_ERROR = "MANAGER_AUTH_ERROR",
  MANAGER_REGISTER_SUCCESS = "MANAGER_REGISTER_SUCCESS",
  MANAGER_REGISTER_FAIL = "MANAGER_REGISTER_FAIL",
  MANAGER_LOGIN_SUCCESS = "MANAGER_LOGIN_SUCCESS",
  MANAGER_LOGIN_FAIL = "MANAGER_LOGIN_FAIL",
  MANAGER_LOGOUT = "MANAGER_LOGOUT",
  GET_USERS = "GET_USERS",
  GET_USER = "GET_USER",
  GET_EVENTS = "GET_EVENTS",
  GET_JOBEVENTS = "GET_JOBEVENTS",
  GET_PROFILE = "GET_PROFILE",
  UPDATE_USER = "UPDATE_USER",
  UPDATE_PROFILE = "UPDATE_PROFILE",
  DELETE_USER = "DELETE_USER",
  GET_DEPARTMENTS ="GET_DEPARTMENTS",
  UPDATE_DEPARTMENT = "UPDATE_DEPARTMENT",
  DELETE_DEPARTMENT = "DELETE_DEPARTMENT",
  GET_ROLES ="GET_ROLES",
  GET_EVENTAPPROVE_SMANAGER = "GET_EVENTAPPROVE_SMANAGER",
  GET_LIST_USERAPPLY = "GET_LIST_USERAPPLY",
  GET_LIST_CTV = "GET_LIST_CTV",
  APPROVE_USER_APPLY_JOB= "APPROVE_USER_APPLY_JOB",
  UNAPPROVE_USER_APPLY_JOB= "UNAPPROVE_USER_APPLY_JOB",
  GET_JOB_USER_APPLY ="GET_JOB_USER_APPLY",
  USER_APPLY_JOB ="USER_APPLY_JOB",
  USER_UNAPPLY_JOB ="USER_UNAPPLY_JOB",
  APPROVE_POSTER = "APPROVE_POSTER",
  GET_STORAGER = "GET_STORAGER",
  CREATE_STORAGER = "CREATE_STORAGER",
  DELETE_STORAGER = "DELETE_STORAGER",
  COMMENT_EVENT = "COMMENT_EVENT",
  DELETE_COMMENT = "DELETE_COMMENT",
  CREATE_EVENT_SUCCESS ="CREATE_EVENT_SUCCESS",
  CREATE_EVENT_FAIL ="CREATE_EVENT_FAIL",
  UPDATE_EVENT = "UPDATE_EVENT",
  DELETE_EVENT = "DELETE_EVENT",
  CREATE_JOBEVENT_SUCCESS ="CREATE_JOBEVENT_SUCCESS",
  CREATE_JOBEVENT_FAIL ="CREATE_JOBEVENT_FAIL",
  UPDATE_JOBEVENT = "UPDATE_JOBEVENT",
  DELETE_JOBEVENT = "DELETE_JOBEVENT",
}

export default ActionTypes;
