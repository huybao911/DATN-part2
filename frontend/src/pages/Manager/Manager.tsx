import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import ManagerForm from "./ManagerForm";
import { getUsers } from "redux/actions/Manager";
import { RootState } from "redux/reducers";
import { IManager } from "redux/types/Manager";
import { IUser } from "redux/types/user";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "60%",
    margin: "auto",
  },
}));

const Manager: React.FC = (): JSX.Element => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [users, setUsers] = React.useState<IUser[]>([]);
  const [Managers, setManagers] = React.useState<IManager[]>([]);
  const Manager = useSelector((state: RootState) => state.Manager);

  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  React.useEffect(() => {
    setUsers(() => Manager?.users?.filter((user: any) => user.role === "640cc3d329937ffacc4359fc"));

    setManagers(() => Manager?.users?.filter((user: any) => user.role === "640cc3ca29937ffacc4359fa"));
  }, [Manager]);

  React.useEffect(() => {
    document.title = "QUẢN LÝ";
  }, []);

  return (
    <div className={styles.root}>
      <div style={{ marginBottom: "5rem" }}>
        <h4>Người Dùng</h4>
        {users?.map((user: any) => <ManagerForm user={user} key={user._id} />) ?? (
          <p>No Users Found.</p>
        )}
      </div>
      <div>
        <h4>Quản Lý</h4>
        {Managers?.map((user: any) => (
          <ManagerForm user={user} key={user._id} />
        )) ?? <p>No Users Found.</p>}
      </div>
    </div>
  );
};

export default Manager;
