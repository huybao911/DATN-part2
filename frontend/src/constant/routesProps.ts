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
    name: "eventAdmin",
    path: "/eventAdmin",
    component: React.lazy(() => import("pages/admin/Events")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "jobEventAdmin",
    path: "/jobEventAdmin",
    component: React.lazy(() => import("pages/admin/JobEvents")),
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
    name: "approveEvent",
    path: "/approveEvent",
    component: React.lazy(() => import("pages/SManager/ApproveEvents")),
    exact: true,
    keyRole: "smanager",
    auth: true,
  },
 

  //MANAGER
  {
    name: "eventManager",
    path: "/eventManager",
    component: React.lazy(() => import("pages/Manager/Events")),
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
  {
    name: "listCTV",
    path: "/listCTV",
    component: React.lazy(() => import("pages/Manager/ListCTV")),
    exact: true,
    keyRole: "manager",
    auth: true,
  },
  {
    name: "event",
    path: "/event",
    component: React.lazy(() => import("pages/Manager/Events")),
    exact: true,
    keyRole: "manager",
    auth: true,
  },
  {
    name: "newevent",
    path: "/event/newevent",
    component: React.lazy(() => import("pages/Manager/NewEvent")),
    exact: true,
    keyRole: "manager",
    auth: true,
  },
  {
    name: "jobEvent",
    path: "/jobEvent",
    component: React.lazy(() => import("pages/Manager/JobEvents")),
    exact: true,
    keyRole: "manager",
    auth: true,
  },
  {
    name: "newJobEvent",
    path: "/jobEvent/newJobEvent",
    component: React.lazy(() => import("pages/Manager/NewJobEvent")),
    exact: true,
    keyRole: "manager",
    auth: true,
  },


  //USER
  {
    name: "storageEvent",
    path: "/storageEvent",
    component: React.lazy(() => import("pages/User/StorageEvent")),
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
