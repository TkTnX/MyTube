import { twMerge } from "tailwind-merge";
import { SidebarNavigationItems1, SidebarNavigationItems2 } from "../../constants";
import { useSidebarStore } from "../../stores/useSidebarStore";
import SidebarNavigationList from "./SidebarNavigationList";

const Sidebar = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  return (
    <div className={twMerge(" sm:w-60 h-[calc(100vh-80px)]", !isOpen && "sm:w-auto")}>
      {/* Sidebar Website Navigation */}
      <SidebarNavigationList items={SidebarNavigationItems1} />
      {/* Sidebar User Navigation */}
      <SidebarNavigationList items={SidebarNavigationItems2} />
    </div>
  );
};

export default Sidebar;
