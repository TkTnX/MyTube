import { SidebarNavigationItems1, SidebarNavigationItems2 } from "../../constants";
import SidebarNavigationList from "./SidebarNavigationList";

const Sidebar = () => {
  return (
    <div className="w-60 h-[calc(100vh-80px)]">
      {/* Sidebar Website Navigation */}
      <SidebarNavigationList items={SidebarNavigationItems1} />
      {/* Sidebar User Navigation */}
      <SidebarNavigationList items={SidebarNavigationItems2} />
    </div>
  );
};

export default Sidebar;
