import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import WebIcon from '@mui/icons-material/Web';

export const dataAdmin = [
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
        icon: <WebIcon />,
        name: 'Bài Viết',
        path: '/postAdmin'
    },
    {
        icon: <SchoolIcon />,
        name: 'Khoa',
        path: '/department'
    },
];

export const dataSManager = [
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
        path: '/event'
    },
    {
        icon: <WorkOutlineIcon />,
        name: 'Công Việc Sự Kiện',
        path: '/jobEvent'
    },
    {
        icon: <WebIcon />,
        name: 'Bài Viết',
        path: '/postsSManager'
    },
];

export const dataManager = [
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
        icon: <WebIcon />,
        name: 'Bài Viết',
        path: '/postsManager'
    },
    {
        icon: <ListAltIcon />,
        name: 'Danh Sách Ứng Tuyển',
        path: '/listUserApply'
    },
];