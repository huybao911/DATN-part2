import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";

import AppLoader from "layouts/AppLoader";
import { RootState } from "redux/reducers";

type Props = {
  component: React.ComponentType<RouteProps>;
};

const ManagerRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);
  const SManager = useSelector((state: RootState) => state.SManager);
  const Manager = useSelector((state: RootState) => state.Manager);
  const admin = useSelector((state: RootState) => state.admin);

  return (
    <Route
      render={(props) => {
        if (Manager.loading) {
          return <AppLoader />;
        }
        if (!Manager.isAuthenticated) {
          return <Redirect to='/login' />;
        }
        if (user.isAuthenticated && user.user.role === "640cc3d329937ffacc4359fc") {
          return <Redirect to='/dashboard' />;
        }
        if (SManager.isAuthenticated && SManager.SManager.role === "640cc3c229937ffacc4359f8") {
          return <Redirect to='/smanager'/>;
        }
        if (admin.isAuthenticated && admin.admin.role === "640cbf0573094a5e2e001859") {
          return <Redirect to='/users' />;
        }
        if (Manager.isAuthenticated && Manager.Manager.role === "640cc3ca29937ffacc4359fa") {
          return <Component {...props} />;
        }
      }}
      {...rest}
    />
  );
};

export default ManagerRoute;
