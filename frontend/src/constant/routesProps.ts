import React from "react";

type ROUTES = {
  name: string;
  path: string;
  component: React.FC;
  exact?: boolean;
  role?: string;
  auth?: boolean;
};
const ADMIN = "640cbf0573094a5e2e001859";
const SMANAGER = "640cc3c229937ffacc4359f8";
const MANAGER = "640cc3ca29937ffacc4359fa";
const USER = "640cc3d329937ffacc4359fc";

const routesProps: ROUTES[] = [
  {
    name: "login",
    path: "/login",
    component: React.lazy(() => import("pages/auth/Login")),
    exact: true,
    role: "guest",
    auth: false,
  },
  {
    name: "loginUser",
    path: "/",
    component: React.lazy(() => import("pages/auth/LoginUser")),
    exact: true,
    role: "guest",
    auth: false,
  },
  {
    name: "register",
    path: "/registerAdmin",
    component: React.lazy(() => import("pages/auth/Register")),
    exact: true,
    role: ADMIN,
    auth: true,
  },
  {
    name: "registerUser",
    path: "/register",
    component: React.lazy(() => import("pages/auth/RegisterUser")),
    exact: true,
    role: "guest",
    auth: false,
  },
  {
    name: "dashboard",
    path: "/dashboard",
    component: React.lazy(() => import("pages/dashboard/Dashboard")),
    exact: true,
    role: USER,
    auth: true,
  },
  {
    name: "smanager",
    path: "/smanager",
    component: React.lazy(() => import("pages/SManager/SManager")),
    exact: true,
    role: SMANAGER,
    auth: true,
  },
  {
    name: "manager",
    path: "/manager",
    component: React.lazy(() => import("pages/Manager/Manager")),
    exact: true,
    role: MANAGER,
    auth: true,
  },
  {
    name: "users",
    path: "/users",
    component: React.lazy(() => import("pages/admin/Users")),
    exact: true,
    role: ADMIN,
    auth: true,
  },
  {
    name: "department",
    path: "/adddepartment",
    component: React.lazy(() => import("pages/admin/AddDepartment")),
    exact: true,
    role: ADMIN,
    auth: true,
  },
  {
    name: "notfound",
    path: "*",
    component: React.lazy(() => import("pages/not-found/NotFound")),
  },
];

export default routesProps;
