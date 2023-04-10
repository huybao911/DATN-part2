// @mui
import { styled } from '@mui/material/styles';
import { ListItemIcon, ListItemButton, MenuItem } from '@mui/material';
import { LinkProps } from 'react-router-dom';

// ----------------------------------------------------------------------

export const StyledListItemButton = styled(ListItemButton)<LinkProps>(() => ({
  
  textTransform: "capitalize",
  '&:hover': {
    backgroundColor: 'transparent'
  },
  '&.active': {
    backgroundColor: 'transparent',
    color: '#6ECCAF'
  },
}));

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: '#4D455D',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const StyledMenuItem = styled(MenuItem)<LinkProps>(() => ({
  
}));

