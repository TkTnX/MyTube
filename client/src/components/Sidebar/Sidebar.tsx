import { twMerge } from "tailwind-merge";
import {
  SidebarNavigationItems1,
  SidebarNavigationItems2,
  SidebarNavigationItemsSmall,
} from "../../constants";
import { useSidebarStore } from "../../stores/useSidebarStore";
import SidebarNavigationList from "./SidebarNavigationList";

const Sidebar = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  return (
    <div
      className={twMerge(
        "text-center sm:text-left sm:min-w-60 lg:min-w-60 md:h-[calc(100vh-80px)] flex items-center  vsm:block fixed bottom-0  right-0 top-auto left-0 vsm:top-20 vsm:sticky bg-[#1a1a1a] vsm:bg-inherit",
        !isOpen && "!text-center sm:min-w-0 lg:min-w-0 w-auto"
      )}
    >
      <div className="block md:hidden w-full px-2 pb-4 pt-3 vsm:px-0 vsm:pb-0 vsm:pt-0   ">
        <SidebarNavigationList items={SidebarNavigationItemsSmall} />
      </div>
      <div className="hidden md:block w-full">
        {/* Sidebar Website Navigation */}
        <SidebarNavigationList items={SidebarNavigationItems1} />
        {/* Sidebar User Navigation */}
        <SidebarNavigationList items={SidebarNavigationItems2} />
      </div>
    </div>
  );
};

export default Sidebar;
