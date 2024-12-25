import { SidebarNavigationItemType } from "../../types";
import SidebarNavigationItem from "./SidebarNavigationItem";

const SidebarNavigationList = ({
  items,
}: {
  items: SidebarNavigationItemType[];
}) => {
  return (
    <nav className="border-b border-[#343434] py-6 grid gap-1 sm:gap-0">
      {items.map((item) => (
        <SidebarNavigationItem item={item} />
      ))}
    </nav>
  );
};

export default SidebarNavigationList;
