import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import { getUsers, deleteUser } from "redux/actions/admin";
import { RootState } from "redux/reducers";
import { IAdmin } from "redux/types/admin";
import { ISManager } from "redux/types/sManager";
import { IManager } from "redux/types/Manager";
import { IUser } from "redux/types/user";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "60%",
    margin: "auto",
  },
}));

function refreshPage() {
  window.location.reload();
}

const Users: React.FC = (): JSX.Element => {

  const styles = useStyles();
  const dispatch = useDispatch();

  const [users, setUsers] = React.useState<IUser[]>([]);
  const [SManagers, setSManagers] = React.useState<ISManager[]>([]);
  const [Managers, setManagers] = React.useState<IManager[]>([]);
  const [admins, setAdmins] = React.useState<IAdmin[]>([]);
  const admin = useSelector((state: RootState) => state.admin);

  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  React.useEffect(() => {
    setUsers(() => admin?.users?.filter((user: any) => user.role.keyRole === "user"));

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

    <TableContainer>
      {/* Table user */}
      <Typography variant="h6" fontWeight="bold" sx={{ textAlign: "center", padding: "10px", marginTop: "10px" }} >User</Typography>
      <Table component={Paper}>
        <TableHead>
          <TableRow >
            <TableCell align="right">Tên User</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Department</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user: any) =>

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
                {user.department}
              </TableCell >

              <TableCell align="center">
                {
                  <Button
                    type='button'
                    variant='contained'
                    color='secondary'
                    size='small'
                    onClick={(e) => dispatch(deleteUser(user._id))}
                  >
                    Xóa
                  </Button>
                }
              </TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>

      {/* Table super manager */}
      <Typography variant="h6" fontWeight="bold" sx={{ textAlign: "center", padding: "10px", marginTop: "10px" }} >Super Manager</Typography>
      <Table component={Paper}>
        <TableHead>
          <TableRow >
            <TableCell align="right">Tên User</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Department</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>

        <TableBody>
          {SManagers.map((user: any) =>

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
                {user.department}
              </TableCell >

              <TableCell align="center">
                {
                  <Button
                    type='button'
                    variant='contained'
                    color='secondary'
                    size='small'
                    onClick={(e) => dispatch(deleteUser(user._id))}
                  >
                    Xóa
                  </Button>
                }
              </TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>

      {/* Table manager */}
      <Typography variant="h6" fontWeight="bold" sx={{ textAlign: "center", padding: "10px", marginTop: "10px" }} >Manager</Typography>
      <Table component={Paper}>
        <TableHead>
          <TableRow >
            <TableCell align="right">Tên User</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Department</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>

        <TableBody>
          {Managers.map((user: any) =>

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
                {user.department}
              </TableCell >

              <TableCell align="center">
                {
                  <Button
                    type='button'
                    variant='contained'
                    color='secondary'
                    size='small'
                    onClick={(e) => dispatch(deleteUser(user._id))}
                  >
                    Xóa
                  </Button>
                }
              </TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>


      {/* two button Create and Add */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Link to="registerAdmin">
          <button style={{ fontSize: "20px", backgroundColor: "#000", color: "#fff", border: "10px solid black" }}>TẠO TÀI KHOẢN</button>
        </Link>
      </div>

      {/* button add */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="adddepartment">
          <button style={{ fontSize: "20px", backgroundColor: "#000", color: "#fff", border: "10px solid black" }}>Thêm tòa nhà</button>
        </Link>
      </div>
    </TableContainer>
  );
};

export default Users;
