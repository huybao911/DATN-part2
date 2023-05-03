import * as React from "react";
import { styled, alpha, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, getDepartments } from "redux/actions/user";
import { RootState } from "redux/reducers";
import { logOutUser } from "redux/actions/user";
import { Box, Button, OutlinedInput, InputAdornment, TextField, Toolbar, AppBar, Typography, Avatar, ListItemIcon, Divider, MenuItem as MenuItemDepartment } from '@material-ui/core';
import { Stack, Popover, MenuItem } from "@mui/material"
import { StyledMenuItem } from '../../layouts/navigation/style'

import { IEvent } from "redux/types/event";
import { IDepartment } from "redux/types/department";

import FeedContent from "pages/contents/FeedContent";

import { purple } from '@mui/material/colors';

import SearchIcon from '@mui/icons-material/Search';
import { Bookmark, Logout, Person, Approval, Notifications } from '@mui/icons-material';

import { Link, NavLink } from "react-router-dom";

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
    }),
    '&.Mui-focused': {
        width: 320,
    },
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
    },
}));

const useStyles = makeStyles((theme) => ({
    textfield: {
        '& .MuiSelect-select': {
            color: 'black', fontSize: '12px'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '20px', paddingRight: '2px'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: '10px'
            },
            '&.Mui-focused fieldset': {
                border: "1px solid black",

            }
        },
        '& label.Mui-focused': {
            color: 'black',

        }
    },
    hoverDetail: {
        '&: hover': {
            color: 'green',
        },
    },
}))

const StyledRoot = styled(AppBar)(() => ({
    boxShadow: 'none',
    width: '100%',
    backgroundColor: 'white',
    fontWeight: 'bold',
}));

const Content: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const openUser = Boolean(anchorElUser);
    const handleClickUser = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUser = () => {
        setAnchorElUser(null);
    };
    const classes = useStyles();
    const [filterName, setFilterName] = React.useState('');

    const [filterNameDepartment, setFilterNameDepartment] = React.useState('');

    const [events, setEvents] = React.useState<IEvent[]>([]);
    const [departments, setDepartments] = React.useState<IDepartment[]>([]);
    const user = useSelector((state: RootState) => state.user);

    React.useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(getDepartments());
    }, [dispatch]);

    React.useEffect(() => {
        setEvents(() =>
            user?.events?.filter((event: any) =>
                event.nameEvent
            ));
    }, [user]);
    React.useEffect(() => {
        setDepartments(() => user?.departments?.filter((department: any) => department.nameDepartment));
    }, [user]);

    const myInputProps_TenKhoa = {
        startAdornment: <InputAdornment position="start"
        > Khoa </InputAdornment>,
        style: {
            height: '40px'
        }
    }

    const handleFilterByName = (event: any) => {
        const keyword = event.target.value;

        if (keyword !== '') {
            const results = user?.events?.filter((event: any) => {
                return event.nameEvent.toLowerCase().startsWith(keyword.toLowerCase()) || event.location.toLowerCase().startsWith(keyword.toLowerCase()) || event.job.some((job: any) => job.nameJob.toLowerCase().startsWith(keyword.toLowerCase()));
                // Use the toLowerCase() method to make it case-insensitive
            });
            setEvents(results);
        } else {
            setEvents(() => user?.events?.filter((event: any) => event.nameEvent || event.location || event.job.some((job: any) => job.nameJob)));
        }

        setFilterName(keyword);
    };

    const handleFilterByNameDepartment = (event: any) => {
        const keyword = event.target.value;

        if (keyword !== '') {
            const results = user?.events?.filter((event: any) => {
                return event.departmentEvent.nameDepartment.toLowerCase().startsWith(keyword.toLowerCase()) || event.departmentEvent.nameDepartment.toLowerCase().startsWith(keyword.toLowerCase()) && event.nameEvent.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            setEvents(results);
        } else {
            setEvents(() => user?.events?.filter((event: any) => event.departmentEvent.nameDepartment));
        }

        setFilterNameDepartment(keyword);
    };

    React.useEffect(() => {
        document.title = "Trang Chủ | CTV";
    }, []);

    return (
        <Box>
            <Box>
                <StyledRoot style={{ boxShadow: "none", overflowX: "hidden" }}>
                    <Toolbar>
                        <Link style={{ textDecoration: 'none' }} to={'/loginuser'}>
                            <img src="/hutech-logo.ico" style={{ height: "56px", width: "50px" }}></img>
                        </Link>
                        <Box textAlign={"center"} sx={{ flexGrow: 1 }}>
                            <StyledSearch
                                style={{ borderRadius: '30px', fontSize: '13px', height: "48px" }}
                                value={filterName}
                                onChange={handleFilterByName}
                                placeholder="Tìm kiếm công việc..."
                                startAdornment={
                                    <InputAdornment position="start" style={{ paddingLeft: 1.3 }}>
                                        <SearchIcon style={{ width: '16px' }} sx={{ color: 'text.disabled' }} />
                                    </InputAdornment>
                                }
                            />
                            <TextField
                                id="filled-select-currency"
                                select
                                value={filterNameDepartment}
                                onChange={handleFilterByNameDepartment}
                                variant="outlined"
                                InputProps={myInputProps_TenKhoa}
                                className={classes.textfield}
                            >
                                {departments.map((department) => (
                                    <MenuItemDepartment key={department._id}
                                        value={department.nameDepartment}
                                        style={{ fontSize: "12px" }}
                                    >
                                        {department.nameDepartment}
                                    </MenuItemDepartment>
                                ))}
                            </TextField>
                        </Box>
                        <Box>
                            <Button type='submit' href='' style={{ color: "white" }}>
                                <Notifications />
                            </Button>
                        </Box>
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={{
                                xs: 0.5,
                                sm: 1,
                            }}
                            sx={{ margin: 3, color: 'black' }}
                        >
                            <Box sx={{
                                display: 'flex', alignItems: 'center', textAlign: 'center'
                            }}>
                                <Button style={{ color: "black" }} size="large" onClick={(event) => handleClickUser(event)} >
                                    <Person />
                                </Button>
                                <Popover
                                    open={openUser}
                                    anchorEl={anchorElUser}
                                    onClose={handleCloseUser}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    PaperProps={{
                                        sx: {
                                            p: 1,
                                            width: 220,
                                            '& .MuiMenuItem-root': {
                                                px: 1,
                                                py: 1,
                                                typography: 'body2',
                                                borderRadius: 0.75,
                                            },
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '& .MuiTypography-root': {
                                                fontSize: "15px",
                                                color: "black"
                                            },
                                        },
                                    }}
                                >
                                    <StyledMenuItem component={NavLink} to={'/profile'} >
                                        <Avatar style={{ backgroundColor: purple[500] }}>{user.user.username.charAt(0).toUpperCase()}</Avatar>
                                        <Typography style={{ color: "black" }}>{user.user.username}</Typography>
                                    </StyledMenuItem>

                                    <Divider />

                                    <StyledMenuItem component={NavLink} to={'/storageEvent'}>
                                        <ListItemIcon>
                                            <Bookmark style={{ color: "black" }} fontSize="small" />
                                        </ListItemIcon>
                                        <Typography>Sự Kiện Đã Lưu</Typography>
                                    </StyledMenuItem>

                                    <StyledMenuItem component={NavLink} to={'/applyJob'}>
                                        <ListItemIcon>
                                            <Approval style={{ color: "black" }} fontSize="small" />
                                        </ListItemIcon>
                                        <Typography>Sự Kiện Đã Ứng Tuyển</Typography>
                                    </StyledMenuItem>

                                    <MenuItem className="navbar-logout" onClick={(e) => dispatch(logOutUser())}>
                                        <ListItemIcon>
                                            <Logout style={{ color: "red" }} fontSize="small" />
                                        </ListItemIcon >
                                        <Typography> Đăng Xuất</Typography>
                                    </MenuItem>

                                </Popover>
                            </Box>
                        </Stack>
                    </Toolbar>
                </StyledRoot>
            </Box>
            <Box style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                <Box style={{ display: "flex", flexDirection: "row" }} >
                    {events && events.length > 0 ? (
                        <Box style={{ display: "flex", flexDirection: "row" }}>
                            <Box style={{ paddingLeft: '20px', top: 100, zIndex: 10, }}>
                                {events.map((event: any) =>
                                    <FeedContent event={event} key={event._id} />) ?? (
                                        <p>No FeedContent Found.</p>
                                    )}
                            </Box>
                            <Box style={{ display: 'flex', paddingLeft: '20px', }}>
                                <Box style={{
                                    backgroundColor: 'white',
                                    width: 500,
                                    height: 1000,
                                    borderRadius: '12px',
                                    position: 'sticky',
                                    zIndex: 10,
                                    top: "100px",
                                }}
                                >
                                    Arguments may evaluate to any type;
                                    if they are pointers the implementation automatically indirects to the base type when required.
                                    If an evaluation yields a function value, such as a function-valued field of a struct,
                                    the function is not invoked automatically, but it can be used as a truth value for an if action and the like.
                                    To invoke it, use the call function, defined below.Arguments may evaluate to any type;
                                    if they are pointers the implementation automatically indirects to the base type when required.
                                    If an evaluation yields a function value, such as a function-valued field of a struct,
                                    the function is not invoked automatically,
                                    but it can be used as a truth value for an if action and the like.
                                    To invoke it, use the call function, defined below.Arguments may evaluate to any type;
                                    if they are pointers the implementation automatically indirects to the base type when required.
                                    If an evaluation yields a function value, such as a function-valued field of a struct,
                                    the function is not invoked automatically, but it can be used as a truth value for an if action and the like.
                                    To invoke it, use the call function, defined below.Arguments may evaluate to any type;
                                    if they are pointers the implementation automatically indirects to the base type when required.
                                    If an evaluation yields a function value, such as a function-valued field of a struct,
                                    the function is not invoked automatically, but it can be used as a truth value for an if action and the like.
                                    To invoke it, use the call function, defined below.Arguments may evaluate to any type;
                                    if they are pointers the implementation automatically indirects to the base type when required.
                                    If an evaluation yields a function value, such as a function-valued field of a struct,
                                    the function is not invoked automatically, but it can be used as a truth value for an if action and the like.
                                    To invoke it, use the call function, defined below.Arguments may evaluate to any type;
                                    if they are pointers the implementation automatically indirects to the base type when required.
                                    If an evaluation yields a function value, such as a function-valued field of a struct,
                                    the function is not invoked automatically, but it can be used as a truth value for an if action and the like.
                                    To invoke it, use the call function, defined below.Arguments may evaluate to any type;
                                    if they are pointers the implementation automatically indirects to the base type when required.
                                    If an evaluation yields a function value, such as a function-valued field of a struct,
                                    the function is not invoked automatically, but it can be used as a truth value for an if action and the like.
                                    To invoke it, use the call function, defined below.Arguments may evaluate to any type;
                                    if they are pointers the implementation automatically indirects to the base type when required.
                                    If an evaluation yields a function value, such as a function-valued field of a struct,
                                    the function is not invoked automatically, but it can be used as a truth value for an if action and the like.
                                    To invoke it, use the call function, defined below.Arguments may evaluate to any type;
                                    if they are pointers the implementation automatically indirects to the base type when required.
                                    If an evaluation yields a function value, such as a function-valued field of a struct,
                                    the function is not invoked automatically, but it can be used as a truth value for an if action and the like.
                                    To invoke it, use the call function, defined below.
                                </Box>

                            </Box>
                        </Box>
                    ) : (
                        <Box style={{margin:"70px 0px"}}>
                            <Box>
                                <img style={{ width: "400px", height: "410px", display:"flex", margin:"auto" }} src="/not-found.png" />
                            </Box>
                            <Box>
                                <Typography style={{fontSize:"45px", fontWeight:"bold"}}>
                                    Không Tồn Tại Sự Kiện
                                </Typography>
                            </Box>
                        </Box>
                    )}

                </Box >
            </Box>
        </Box >
    );
};

export default Content;
