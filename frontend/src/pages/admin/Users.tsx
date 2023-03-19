import * as React from "react";
import { makeStyles, styled, alpha } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getUsers, deleteUser, updateUser } from "redux/actions/admin";
import { RootState } from "redux/reducers";
import { IAdmin } from "redux/types/admin";
import { ISManager } from "redux/types/sManager";
import { IManager } from "redux/types/Manager";
import { IUser } from "redux/types/user";
import { IconButton, TableSortLabel, Toolbar, OutlinedInput, InputAdornment, Button, Card, Container, MenuItem, Popover, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import UserForm from "./UserForm";
import { forwardRef } from 'react';
// icons
import { Icon } from '@iconify/react';
// @mui
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box } from "@mui/system";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "60%",
    margin: "auto",
  },
  btnLogin: {
    marginTop: theme.spacing(1.5),
    marginRight: theme.spacing(1),
    padding: theme.spacing(1, 2),
  },
  accordion: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
  },
}));

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

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

const Users: React.FC = (): JSX.Element => {

  const styles = useStyles();
  const dispatch = useDispatch();


  const [users, setUsers] = React.useState<IUser[]>([]);
  const [SManagers, setSManagers] = React.useState<ISManager[]>([]);
  const [Managers, setManagers] = React.useState<IManager[]>([]);
  const [admins, setAdmins] = React.useState<IAdmin[]>([]);
  const admin = useSelector((state: RootState) => state.admin);

  const [open, setOpen] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterName, setFilterName] = React.useState('');

  const [nameDirection, setNameDirection] = React.useState("asc");



  const handleChangeRowsPerPage = (event: any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleFilterByName = (event: any) => {
    setPage(0);
    const keyword = event.target.value;

    if (keyword !== '') {
      const results = admin?.users?.filter((user: any) => {
        if (user.role.keyRole !== "admin")
          return user.username.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setUsers(results);
    } else {
      setUsers(() => admin?.users?.filter((user: any) => user.role.keyRole === "user" || user.role.keyRole === "manager" || user.role.keyRole === "smanager"));
      // If the text field is empty, show all users
    }

    setFilterName(keyword);
  };

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };


  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  React.useEffect(() => {
    setUsers(() => admin?.users?.filter((user: any) => user.role.keyRole === "user" || user.role.keyRole === "manager" || user.role.keyRole === "smanager"));

    setManagers(() => admin?.users?.filter((user: any) => user.role.keyRole === "manager"));

    setSManagers(() => admin?.users?.filter((user: any) => user.role.keyRole === "smanager"));

    setAdmins(() => admin?.users?.filter((user: any) => user.role.keyRole === "admin"));
  }, [admin]);

  React.useEffect(() => {
    document.title = "ADMIN";
  }, []);

  return (
    // <div className={styles.root}>
    //   <div style={{ marginBottom: "5rem" }}>
    //     <h4>Người Dùng</h4>
    //     {users?.map((user: any) => <UserForm user={user} key={user._id} />) ?? (
    //       <p>No Users Found.</p>
    //     )}
    //   </div>
    //   <div>
    //     <h4>Quản Lý</h4>
    //     {Managers?.map((user: any) => (
    //       <UserForm user={user} key={user._id} />
    //     )) ?? <p>No Users Found.</p>}
    //   </div>
    //   <div>
    //     <h4>Quản Lý Cấp Cao</h4>
    //     {SManagers?.map((user: any) => (
    //       <UserForm user={user} key={user._id} />
    //     )) ?? <p>No Users Found.</p>}
    //   </div>
    //   <div>
    //     <h4>Quản Trị Viên</h4>
    //     {admins?.map((user: any) => (
    //       <UserForm user={user} key={user._id} />
    //     )) ?? <p>No Users Found.</p>}
    //   </div>
    //   <div style={{ textAlign: "center" }}>
    //     <Link to="registerAdmin">
    //       <button style={{fontSize:"20px", backgroundColor:"#000", color:"#fff",border:"10px solid black"}}>TẠO TÀI KHOẢN</button>
    //     </Link>
    //   </div>

    //   <div style={{ textAlign: "center", marginTop: "20px" }}>
    //     <Link to="adddepartment">
    //       <button style={{fontSize:"20px", backgroundColor:"#000", color:"#fff",border:"10px solid black"}}>Thêm tòa nhà</button>
    //     </Link>
    //   </div>

    // </div>
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button style={{ backgroundColor: "black", padding: "6px 16px", color: "white" }} variant="contained" >
            New User
          </Button>
        </Stack>

        <Card>
          <StyledRoot
            sx={{
              color: 'primary.main',
              bgcolor: 'primary.lighter',
            }}
          >
            <StyledSearch
              value={filterName}
              onChange={handleFilterByName}
              placeholder="Tìm kiếm user..."
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
            />
          </StyledRoot>
          <TableContainer>
            {/* Table user */}
            <Table component={Paper}>
              <TableHead>
              <TableRow>
                <TableCell align="right">User</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Department</TableCell>
                <TableCell align="right" />
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            {users && users.length > 0 ? (
              <TableBody>
                {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user: any) =>
                  <TableRow key={user.username}>
                    <TableCell align="right">
                      {user.username}
                    </TableCell>

                    <TableCell align="right">
                      {user.email}
                    </TableCell>

                    <TableCell align="right">
                      {user.role.keyRole}
                    </TableCell>

                    <TableCell align="right">
                      {user.department.nameDepartment}
                    </TableCell >
                    {/* Button delete */}
                    {/* <TableCell align="center">
                      {
                        <Button style={{ backgroundColor: "black", color: "white", padding: "4px 10px" }}
                          type='button'
                          variant='contained'
                          color='secondary'
                          size='small'
                          onClick={(e) => dispatch(deleteUser(user._id))}
                        >
                          Xóa
                        </Button>
                      }
                    </TableCell> */}
                    <TableCell align="right">
                      <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                        <MoreVertIcon />
                      </IconButton>
                      <Popover
                        open={Boolean(open)}
                        anchorEl={open}
                        onClick={handleCloseMenu}
                        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        PaperProps={{
                          sx: {
                            p: 1,
                            width: 140,
                            '& .MuiMenuItem-root': {
                              px: 1,
                              typography: 'body2',
                              borderRadius: 0.75,
                            },
                          },
                        }}
                      >
                        <MenuItem>
                          <Box>
                            <EditIcon sx={{ mr: 2 }} />
                          </Box>
                          <Box>
                            Sửa
                          </Box>
                        </MenuItem>

                        <MenuItem onClick={(e) => dispatch(deleteUser(user._id))} sx={{ color: 'error.main' }}>
                          <DeleteForeverIcon sx={{ mr: 2 }} />
                          Xóa
                        </MenuItem>
                      </Popover>
                    </TableCell>

                    {/* <TableCell align="center">
                {
                  <Button style={{backgroundColor:"black"}}
                    type='button'
                    variant='contained'
                    color='secondary'
                    size='small'
                    onClick={e => {}}
                  >
                    Chỉnh sửa
                  </Button>
                }
              </TableCell> */}

                    {/* <TableCell>
                 <UserForm user={user} key={user._id} />
              </TableCell> */}

                  </TableRow>


                )}
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={users.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <Typography variant="h6" paragraph>
                      Không tồn tại user
                    </Typography>

                    <Typography variant="body2">
                      Không tìm thấy kết quả &nbsp;
                      <strong>&quot;{filterName}&quot;</strong>.
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>

          {/* <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Link to="registerAdmin">
            <button style={{ fontSize: "20px", backgroundColor: "#000", color: "#fff", border: "10px solid black" }}>TẠO TÀI KHOẢN</button>
          </Link>
        </div>

       
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to="adddepartment">
            <button style={{ fontSize: "20px", backgroundColor: "#000", color: "#fff", border: "10px solid black" }}>Thêm tòa nhà</button>
          </Link>
        </div> */}


        </TableContainer>
      </Card>
    </Container>
    </>
  );
};

export default Users;
