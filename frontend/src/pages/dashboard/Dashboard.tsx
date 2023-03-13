import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";

const Dashboard: React.FC = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    document.title = "NGƯỜI DÙNG";
  }, []);

  return (
      <div>Welcome {user?.user?.username ?? ""}</div>
  );
};

export default Dashboard;
