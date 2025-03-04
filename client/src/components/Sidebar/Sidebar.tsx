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
        "text-center sm:text-left md:min-w-60 flex items-center vsm:block fixed -mx-4 vsm:-mx-0 mt-2 vsm:mt-0 bottom-0 right-0 top-auto left-0 vsm:top-20 vsm:sticky bg-[#1a1a1a] vsm:bg-inherit z-[9] md:overflow-y-auto",
        !isOpen && "md:min-w-0 !text-center"
      )}
    >
      <div className="block md:hidden w-full pb-4 pt-3 vsm:px-0 vsm:pb-0 vsm:pt-0 ">
        <SidebarNavigationList items={SidebarNavigationItemsSmall} />
      </div>

      <div
        className={twMerge(
          "hidden md:block w-full max-w-60 max-h-screen overflow-y-auto",
          isOpen && "max-h-screen"
        )}
      >
        {/* Sidebar Website Navigation */}
        <SidebarNavigationList items={SidebarNavigationItems1} />
        {/* Sidebar User Navigation */}
        <SidebarNavigationList
          isUserNav={true}
          items={SidebarNavigationItems2}
        />
      </div>
    </div>
  );
};

export default Sidebar;
