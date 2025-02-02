import { SidebarNavigationItemType } from "../../types";
import SidebarNavigationItem from "./SidebarNavigationItem";
import SidebarNavigationPlaylistItem from "./SidebarNavigationPlaylistItem";

type Props = {
  items: SidebarNavigationItemType[];
  isUserNav?: boolean;
};

const SidebarNavigationList: React.FC<Props> = ({
  items,
  isUserNav = false,
}) => {
  return (
    <nav className="md:border-b border-[#343434] vsm:py-6 flex items-center w-full justify-between flex-row vsm:flex-col  gap-1 vsm:gap-10 md:gap-1 sm:gap-0 ">
      {items.map((item) => (
        <SidebarNavigationItem key={item.href} item={item} />
      ))}
      {isUserNav && <SidebarNavigationPlaylistItem />}
    </nav>
  );
};

export default SidebarNavigationList;
