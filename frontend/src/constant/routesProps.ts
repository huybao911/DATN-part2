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
  {
    name: "login",
    path: "/login",
    component: React.lazy(() => import("pages/auth/Login")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "loginUser",
    path: "/",
    component: React.lazy(() => import("pages/auth/LoginUser")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "register",
    path: "/registerAdmin",
    component: React.lazy(() => import("pages/auth/Register")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "registerUser",
    path: "/register",
    component: React.lazy(() => import("pages/auth/RegisterUser")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "dashboard",
    path: "/dashboard",
    component: React.lazy(() => import("pages/dashboard/Dashboard")),
    exact: true,
    keyRole: "user",
    auth: true,
  },
  {
    name: "smanager",
    path: "/smanager",
    component: React.lazy(() => import("pages/SManager/SManager")),
    exact: true,
    keyRole: "smanager",
    auth: true,
  },
  {
    name: "manager",
    path: "/manager",
    component: React.lazy(() => import("pages/Manager/Manager")),
    exact: true,
    keyRole: "manager",
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
    path: "/adddepartment",
    component: React.lazy(() => import("pages/admin/AddDepartment")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "notfound",
    path: "*",
    component: React.lazy(() => import("pages/not-found/NotFound")),
  },
];

export default routesProps;
