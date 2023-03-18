import { Box, List, ListItemText } from '@mui/material';
import { StyledNavItem, StyledNavItemIcon } from './style';
import { Link, NavLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import EventIcon from '@mui/icons-material/Event';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SchoolIcon from '@mui/icons-material/School';


export default function NavSection() {

    const data = [
        {
            icon: <LeaderboardIcon />,
            name: 'Bảng Điều Khiển',
            path: '/users'
        },
        {
            icon: <AccountCircleIcon />,
            name: 'User',
            path: '/users'
        },
        {
            icon: <EventIcon />,
            name: 'Sự Kiện',
            path: '/users'
        },
        {
            icon: <PostAddIcon />,
            name: 'Bài Viết',
            path: '/users'
        },
        {
            icon: <SchoolIcon />,
            name: 'Khoa',
            path: '/users'
        },
    ];

    return (
        <>
            <Box>
                <List disablePadding sx={{ p: 1 }}>
                    {data.map((item) => (
                        <Link style={{ textDecoration: "none" }} key={item.name} to={item.path}>
                            <StyledNavItem 
                                sx={{
                                    '&.active': {
                                        color: 'text.primary',
                                        bgcolor: 'action.selected',
                                        fontWeight: 'fontWeightBold',
                                    },
                                    '&.MuiButtonBase-root': {
                                        display: 'flex',
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                    }
                                }}>
                                <StyledNavItemIcon >
                                    {item.icon}
                                </StyledNavItemIcon>
                                <ListItemText style={{ color: "black" }}  disableTypography> {item.name} </ListItemText>
                            </StyledNavItem>
                        </Link>
                    ))}
                </List>
            </Box>
            {/* <Link style={{ textDecoration: "none" }} to='/users'>
                <Box >
                    <List disablePadding sx={{ p: 1 }}>
                        <StyledNavItem
                            sx={{
                                '&.active': {
                                    color: 'text.primary',
                                    bgcolor: 'action.selected',
                                    fontWeight: 'fontWeightBold',
                                },
                            }}
                        >
                            <StyledNavItemIcon>
                                <IconUser />
                            </StyledNavItemIcon>

                            <ListItemText disableTypography> User </ListItemText>

                        </StyledNavItem>
                    </List>
                </Box>
            </Link> */}

        </>

    )
}