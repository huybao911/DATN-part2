import { Box, List, ListItemText } from '@mui/material';
import { StyledListItemButton, StyledNavItemIcon } from './style';
import { Link } from 'react-router-dom';
import { dataAdmin, dataSManager, dataManager } from './dataConfig'
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { Stack } from '@mui/system';

export default function NavSection() {

    const smanager = useSelector((state: RootState) => state.smanager);
    const manager = useSelector((state: RootState) => state.manager);
    const admin = useSelector((state: RootState) => state.admin);

    const topAM = admin.isAuthenticated && admin.getRole.keyRole === "admin" ? (
        <Stack spacing={3}>
                {dataAdmin.map((item) => (
                    <StyledListItemButton  component={Link} to={item.path} key={item.name}>
                        <StyledNavItemIcon>
                            {item.icon}
                        </StyledNavItemIcon>
                        <ListItemText disableTypography primary={item.name} />
                    </StyledListItemButton>
                ))}
            </Stack>
    ) : smanager.isAuthenticated && smanager.getRole.keyRole === "smanager" ? (
            <Stack spacing={2}>
                {dataSManager.map((item) => (
                    <StyledListItemButton  component={Link} to={item.path} key={item.name}>
                        <StyledNavItemIcon>
                            {item.icon}
                        </StyledNavItemIcon>
                        <ListItemText disableTypography primary={item.name} />
                    </StyledListItemButton>
                ))}
            </Stack>
       
    ) : manager.isAuthenticated && manager.getRole.keyRole === "manager" ? (
        <Stack spacing={1}>
                {dataManager.map((item) => (
                    <StyledListItemButton  component={Link} to={item.path} key={item.name}>
                        <StyledNavItemIcon>
                            {item.icon}
                        </StyledNavItemIcon>
                        <ListItemText disableTypography primary={item.name} />
                    </StyledListItemButton>
                ))}
            </Stack>
    ) : null;

    return (
        <>
            {topAM}
        </>

    )
}