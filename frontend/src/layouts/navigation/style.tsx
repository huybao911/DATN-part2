// @mui
import { styled } from '@mui/material/styles';
import { ListItemIcon, ListItemButton, MenuItem } from '@mui/material';
import { LinkProps } from 'react-router-dom';

// ----------------------------------------------------------------------

export const StyledListItemButton = styled(ListItemButton)<LinkProps>(() => ({
  
  textTransform: "capitalize",
  // '&:hover': {
  //   backgroundColor: 'transparent'
  // },
  // '&:focus': {
  //   backgroundColor: 'green',
  //   color: '#6ECCAF'
  // },
}));

export const StyledNavItemIcon = styled(ListItemIcon)({
  color: '#979797',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const StyledMenuItem = styled(MenuItem)<LinkProps>(() => ({
  
}));

