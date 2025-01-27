import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { useSidebarStore } from "../stores/useSidebarStore";
import { twMerge } from "tailwind-merge";

const RootLayout = () => {
  const { isOpen } = useSidebarStore();
  return (
    <>
      <Header />
      <main
        className={twMerge(
          "flex flex-col-reverse vsm:flex-row vsm:items-start gap-2 sm:gap-7 md:gap-14 mx-4 sm:mx-8 xl:mx-16 mb-28 vsm:mb-0 vsm:h-[calc(100vh-80px)]",
          !isOpen && "!gap-2 !ml-2"
        )}
      >
        <Sidebar />
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
