import { Box, List, ListItemText } from '@mui/material';
import { StyledNavItem, StyledNavItemIcon } from './style';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import EventIcon from '@mui/icons-material/Event';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SchoolIcon from '@mui/icons-material/School';
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";


export default function NavSection() {

    const smanager = useSelector((state: RootState) => state.smanager);
    const manager = useSelector((state: RootState) => state.manager);
    const admin = useSelector((state: RootState) => state.admin);

    const dataAdmin = [
        {
            icon: <LeaderboardIcon />,
            name: 'Bảng Điều Khiển',
            path: '/*'
        },

        {
            icon: <AccountCircleIcon />,
            name: 'User',
            path: '/users'
        },
        {
            icon: <EventIcon />,
            name: 'Sự Kiện',
            path: '/*'
        },
        {
            icon: <PostAddIcon />,
            name: 'Bài Viết',
            path: '/*'
        },
        {
            icon: <SchoolIcon />,
            name: 'Khoa',
            path: '/*'
        },
    ];

    const dataSManager = [
        {
            icon: <LeaderboardIcon />,
            name: 'Bảng Điều Khiển',
            path: '/*'
        },

        {
            icon: <AccountCircleIcon />,
            name: 'User',
            path: '/smanager'
        },
        {
            icon: <EventIcon />,
            name: 'Sự Kiện',
            path: '/*'
        },
        {
            icon: <PostAddIcon />,
            name: 'Bài Viết',
            path: '/postsSManager'
        },
        {
            icon: <SchoolIcon />,
            name: 'Khoa',
            path: '/*'
        },
    ];

    const dataManager = [
        {
            icon: <LeaderboardIcon />,
            name: 'Bảng Điều Khiển',
            path: '/*'
        },

        {
            icon: <AccountCircleIcon />,
            name: 'User',
            path: '/manager'
        },
        {
            icon: <EventIcon />,
            name: 'Sự Kiện',
            path: '/*'
        },
        {
            icon: <PostAddIcon />,
            name: 'Bài Viết',
            path: '/postsManager'
        },
        {
            icon: <SchoolIcon />,
            name: 'Khoa',
            path: '/*'
        },
    ];
    const topAM = admin.isAuthenticated && admin.getRole.keyRole === "admin" ? (
        <Box>
            <List disablePadding sx={{ p: 1 }}>
                {dataAdmin.map((item) => (
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
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                    color: 'black'
                                }
                            }}>
                            <StyledNavItemIcon >
                                {item.icon}
                            </StyledNavItemIcon>
                            <ListItemText style={{ color: "black" }} disableTypography> {item.name} </ListItemText>
                        </StyledNavItem>
                    </Link>
                ))}
            </List>
        </Box>
    ) : smanager.isAuthenticated && smanager.getRole.keyRole === "smanager" ? (
        <Box>
            <List disablePadding sx={{ p: 1 }}>
                {dataSManager.map((item) => (
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
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                    color: 'black'
                                }
                            }}>
                            <StyledNavItemIcon >
                                {item.icon}
                            </StyledNavItemIcon>
                            <ListItemText style={{ color: "black" }} disableTypography> {item.name} </ListItemText>
                        </StyledNavItem>
                    </Link>
                ))}
            </List>
        </Box>
    ) : manager.isAuthenticated && manager.getRole.keyRole === "manager" ? (
        <Box>
            <List disablePadding sx={{ p: 1 }}>
                {dataManager.map((item) => (
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
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                    color: 'black'
                                }
                            }}>
                            <StyledNavItemIcon >
                                {item.icon}
                            </StyledNavItemIcon>
                            <ListItemText style={{ color: "black" }} disableTypography> {item.name} </ListItemText>
                        </StyledNavItem>
                    </Link>
                ))}
            </List>
        </Box>
    ) : null;

    return (
        <>
            {topAM}
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