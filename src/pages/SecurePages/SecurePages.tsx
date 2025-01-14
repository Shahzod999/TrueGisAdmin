import { Outlet } from "react-router";
import { useAppSelector } from "../../app/hook/reduxHooks";
import { selectedUserinfoSlice } from "../../app/features/userSlice";
import Auth from "../Home/Auth/Auth";

const SecurePages = () => {
  const status = useAppSelector(selectedUserinfoSlice);

  return <div>{status ? <Outlet /> : <Auth />}</div>;
};

export default SecurePages;
