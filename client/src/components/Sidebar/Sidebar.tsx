import { twMerge } from "tailwind-merge";
import {
  SidebarNavigationItems1,
  SidebarNavigationItems2,
} from "../../constants";
import { useSidebarStore } from "../../stores/useSidebarStore";
import SidebarNavigationList from "./SidebarNavigationList";

const Sidebar = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  return (
    <div
      className={twMerge(
        "text-center sm:text-left sm:min-w-32 lg:min-w-60 h-[calc(100vh-80px)] sticky top-20 hidden vsm:block",
        !isOpen && "sm:min-w-0 lg:min-w-0 min-w-0 !text-center"
      )}
    >
      {/* Sidebar Website Navigation */}
      <SidebarNavigationList items={SidebarNavigationItems1} />
      {/* Sidebar User Navigation */}
      <SidebarNavigationList items={SidebarNavigationItems2} />
    </div>
  );
};

export default Sidebar;
