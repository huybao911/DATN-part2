import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import AppHeader from "layouts/navigation/AppHeader";
import Alert from "layouts/alert/Alert";
import Routes from "components/routing/Routes";
import { styled } from '@mui/material/styles';


import { setAdminAuthToken, setManagerAuthToken, setSManagerAuthToken, setUserAuthToken } from "utils/headers";
import { loadUser } from "redux/actions/user";
import { loadManager } from "redux/actions/Manager";
import { loadSManager } from "redux/actions/sManager";
import { loadAdmin } from "redux/actions/admin";


if (localStorage.admin__token) setAdminAuthToken(localStorage.admin__token);
if (localStorage.Manager__token) setManagerAuthToken(localStorage.Manager__token);
if (localStorage.SManager__token) setSManagerAuthToken(localStorage.SManager__token);
if (localStorage.user__token) setUserAuthToken(localStorage.user__token);

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const App: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  React.useEffect(() => dispatch<any>(loadUser()), [dispatch]);
  React.useEffect(() => dispatch<any>(loadManager()), [dispatch]);
  React.useEffect(() => dispatch<any>(loadSManager()), [dispatch]);
  React.useEffect(() => dispatch<any>(loadAdmin()), [dispatch]);

  return (
    <BrowserRouter>
    <>
     <StyledRoot>
     <AppHeader />
      <main className='app'>
        <Routes />
        <Alert />
      </main>
     </StyledRoot>
      
    </>
    </BrowserRouter>
  );
};

export default App;
