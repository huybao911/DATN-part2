import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import UserForm from "./UserForm";
import { getUsers } from "redux/actions/admin";
import { RootState } from "redux/reducers";
import { IAdmin } from "redux/types/admin";
import { ISManager } from "redux/types/sManager";
import { IManager } from "redux/types/Manager";
import { IUser } from "redux/types/user";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "60%",
    margin: "auto",
  },
}));

function refreshPage(){ 
  window.location.reload(); 
}

const Users: React.FC = (): JSX.Element => {
  const ADMIN = "640cbf0573094a5e2e001859";
  const SMANAGER = "640cc3c229937ffacc4359f8";
  const MANAGER = "640cc3ca29937ffacc4359fa";
  const USER = "640cc3d329937ffacc4359fc";


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
    setUsers(() => admin?.users?.filter((user: any) => user.role === USER));

    setManagers(() => admin?.users?.filter((user: any) => user.role === MANAGER));

    setSManagers(() => admin?.users?.filter((user: any) => user.role === SMANAGER));

    setAdmins(() => admin?.users?.filter((user: any) => user.role === ADMIN));
  }, [admin]);

  React.useEffect(() => {
    document.title = "ADMIN";
  }, []);

  return (
    <div className={styles.root}>
      <div style={{ marginBottom: "5rem" }}>
        <h4>Người Dùng</h4>
        {users?.map((user: any) => <UserForm user={user} key={user._id} />) ?? (
          <p>No Users Found.</p>
        )}
      </div>
      <div>
        <h4>Quản Lý</h4>
        {Managers?.map((user: any) => (
          <UserForm user={user} key={user._id} />
        )) ?? <p>No Users Found.</p>}
      </div>
      <div>
        <h4>Quản Lý Cấp Cao</h4>
        {SManagers?.map((user: any) => (
          <UserForm user={user} key={user._id} />
        )) ?? <p>No Users Found.</p>}
      </div>
      <div>
        <h4>Quản Trị Viên</h4>
        {admins?.map((user: any) => (
          <UserForm user={user} key={user._id} />
        )) ?? <p>No Users Found.</p>}
      </div>
      <div style={{ textAlign: "center" }}>
        <Link to="registerAdmin">
          <button style={{fontSize:"20px", backgroundColor:"#000", color:"#fff",border:"10px solid black"}}>TẠO TÀI KHOẢN</button>
        </Link>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="adddepartment">
          <button style={{fontSize:"20px", backgroundColor:"#000", color:"#fff",border:"10px solid black"}}>Thêm tòa nhà</button>
        </Link>
      </div>
      
    </div>
  );
};

export default Users;
