import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="flex items-start gap-14 mx-16">
        <Sidebar />
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
