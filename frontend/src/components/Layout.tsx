import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";

const Layout = () => {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Appbar />
      <div
      // className="flex-grow overflow-auto"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
