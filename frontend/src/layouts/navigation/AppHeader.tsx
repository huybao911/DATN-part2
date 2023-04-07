import React from "react";
import { useSelector } from "react-redux";
import { styled } from '@mui/material/styles';

import { RootState } from "redux/reducers";
import { Stack, AppBar, Box } from '@mui/material';


const NAV_WIDTH = 230;

const StyledRoot = styled(AppBar)(() => ({
  boxShadow: 'none',
  width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  backgroundColor: 'white',
  alignItems: 'center',
  fontWeight: 'bold',
}));

const AppHeader: React.FC = (): JSX.Element => {

  const smanager = useSelector((state: RootState) => state.smanager);
  const manager = useSelector((state: RootState) => state.manager);
  const admin = useSelector((state: RootState) => state.admin);

  const header = admin.isAuthenticated || smanager.isAuthenticated || manager.isAuthenticated ? (
    <StyledRoot style={{ boxShadow: "none" }} >
      <Stack
        direction="row"
        alignItems="center"
        spacing={{
          xs: 0.5,
          sm: 1,
        }}
        sx={{ margin: 3 }}
      >
        <Box sx={{ color: 'black' }}>
          <img src="/hutech-logo.ico" style={{ height: "56px", width: "50px" }}></img>
        </Box>
      </Stack>
    </StyledRoot>

  ) : null

  return (
    <>
      {header}
    </>
  );
};

export default AppHeader;
