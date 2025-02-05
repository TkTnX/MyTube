import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Image from "../ui/Image";
import { useSidebarStore } from "../../stores/useSidebarStore";
import { SidebarNavigationItemType } from "../../types";

const SidebarNavigationItem = ({
  item,
}: {
  item: SidebarNavigationItemType;
}) => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const { pathname } = useLocation();

  return (
    <Link
      className={twMerge(
        "flex flex-col  sm:flex-row items-center gap-1 sm:gap-5 py-1 sm:p-[10px] hover:bg-[#332729] rounded-[10px] transition min-w-[60px] w-full text-[#bababa] ",
        [
          !isOpen && " sm:flex-col  sm:gap-1  sm:py-1 text-[#bababa] ",
          pathname === item.href && "bg-[#332729] text-white",
        ]
      )}
      to={item.href}
      key={item.href}
    >
      <Image
        src={`${item.imgPath}.svg`}
        alt={item.title}
        width="24"
        height="24"
        className="min-w-6 min-h-6"
      />
      <span
        className={twMerge(
          "font-medium leading-6 text-sm sm:text-base",
          !isOpen && "text-xs sm:text-xs"
        )}
      >
        {item.title}
      </span>
    </Link>
  );
};

export default SidebarNavigationItem;
