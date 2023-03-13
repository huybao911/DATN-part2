import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import SManagerForm from "./SManagerForm";
import { getUsers } from "redux/actions/sManager";
import { RootState } from "redux/reducers";
import { ISManager } from "redux/types/sManager";
import { IManager } from "redux/types/Manager";
import { IUser } from "redux/types/user";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "60%",
    margin: "auto",
  },
}));

const Smanager: React.FC = (): JSX.Element => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [users, setUsers] = React.useState<IUser[]>([]);
  const [Managers, setManagers] = React.useState<IManager[]>([]);
  const [SManagers, setSManagers] = React.useState<ISManager[]>([]);
  const SManager = useSelector((state: RootState) => state.SManager);

  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  React.useEffect(() => {
    setUsers(() => SManager?.users?.filter((user: any) => user.role === "user"));

    setManagers(() => SManager?.users?.filter((user: any) => user.role === "Manager"));

    setSManagers(() => SManager?.users?.filter((user: any) => user.role === "SManager"));
  }, [SManager]);

  React.useEffect(() => {
    document.title = "Quản Lý Cấp Cao";
  }, []);

  return (
    <div className={styles.root}>
      <div style={{ marginBottom: "5rem" }}>
        <h4>Người Dùng</h4>
        {users?.map((user: any) => <SManagerForm user={user} key={user._id} />) ?? (
          <p>No Users Found.</p>
        )}
      </div>
      <div>
        <h4>Quản Lý</h4>
        {Managers?.map((user: any) => (
          <SManagerForm user={user} key={user._id} />
        )) ?? <p>No Users Found.</p>}
      </div>
      <div>
        <h4>Quản Lý Cấp Cao</h4>
        {SManagers?.map((user: any) => (
          <SManagerForm user={user} key={user._id} />
        )) ?? <p>No Users Found.</p>}
      </div>
    </div>
  );
};

export default Smanager;
