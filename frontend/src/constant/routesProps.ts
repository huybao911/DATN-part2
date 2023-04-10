import React from "react";

type ROUTES = {
  name: string;
  path: string;
  component: React.FC;
  exact?: boolean;
  keyRole?: string;
  auth?: boolean;
};

const routesProps: ROUTES[] = [
  //GUEST
  {
    name: "login",
    path: "/login",
    component: React.lazy(() => import("pages/auth/Login")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "homepage",
    path: "/",
    component: React.lazy(() => import("pages/contents/Content")),
    exact: true,
    // keyRole: "guest",
    auth: false,
  },
  {
    name: "loginUser",
    path: "/loginuser",
    component: React.lazy(() => import("pages/auth/LoginUser")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "registerUser",
    path: "/register",
    component: React.lazy(() => import("pages/auth/RegisterUser")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },

  //ADMIN
  {
    name: "register",
    path: "/registerAdmin",
    component: React.lazy(() => import("pages/auth/Register")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "register",
    path: "/users/registerAdmin",
    component: React.lazy(() => import("pages/auth/Register")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "users",
    path: "/users",
    component: React.lazy(() => import("pages/admin/Users")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "department",
    path: "/department",
    component: React.lazy(() => import("pages/admin/Department")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "adddepartment",
    path: "/adddepartment",
    component: React.lazy(() => import("pages/admin/AddDepartment")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "postAdmin",
    path: "/postAdmin",
    component: React.lazy(() => import("pages/admin/Post")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },

  //SMANAGER
  {
    name: "smanager",
    path: "/smanager",
    component: React.lazy(() => import("pages/SManager/SManager")),
    exact: true,
    keyRole: "smanager",
    auth: true,
  },
  {
    name: "postsSManager",
    path: "/postsSManager",
    component: React.lazy(() => import("pages/SManager/ApprovePosts")),
    exact: true,
    keyRole: "smanager",
    auth: true,
  },
  {
    name: "event",
    path: "/event",
    component: React.lazy(() => import("pages/SManager/Events")),
    exact: true,
    keyRole: "smanager",
    auth: true,
  },
  {
    name: "newevent",
    path: "/event/newevent",
    component: React.lazy(() => import("pages/SManager/NewEvent")),
    exact: true,
    keyRole: "smanager",
    auth: true,
  },
  {
    name: "jobEvent",
    path: "/jobEvent",
    component: React.lazy(() => import("pages/SManager/JobEvents")),
    exact: true,
    keyRole: "smanager",
    auth: true,
  },
  {
    name: "newJobEvent",
    path: "/jobEvent/newJobEvent",
    component: React.lazy(() => import("pages/SManager/NewJobEvent")),
    exact: true,
    keyRole: "smanager",
    auth: true,
  },

  //MANAGER
  {
    name: "manager",
    path: "/manager",
    component: React.lazy(() => import("pages/Manager/Manager")),
    exact: true,
    keyRole: "manager",
    auth: true,
  },
  {
    name: "postsManager",
    path: "/postsManager",
    component: React.lazy(() => import("pages/Manager/Posts")),
    exact: true,
    keyRole: "manager",
    auth: true,
  },
  {
    name: "newpost",
    path: "/posts/newpost",
    component: React.lazy(() => import("pages/Manager/NewPost")),
    exact: true,
    keyRole: "manager",
    auth: true,
  },
  {
    name: "listUserApply",
    path: "/listUserApply",
    component: React.lazy(() => import("pages/Manager/ListUserAppy")),
    exact: true,
    keyRole: "manager",
    auth: true,
  },

  //USER
  {
    name: "storagePost",
    path: "/storagePost",
    component: React.lazy(() => import("pages/User/StoragePost")),
    exact: true,
    keyRole: "user",
    auth: true,
  },
  {
    name: "applyPost",
    path: "/applyPost",
    component: React.lazy(() => import("pages/User/ApplyPost")),
    exact: true,
    keyRole: "user",
    auth: true,
  },
  {
    name: "profile",
    path: "/profile",
    component: React.lazy(() => import("pages/User/Profile")),
    exact: true,
    keyRole: "user",
    auth: true,
  },
  {
    name: "notfound",
    path: "*",
    component: React.lazy(() => import("pages/not-found/NotFound")),
  },
];

export default routesProps;
