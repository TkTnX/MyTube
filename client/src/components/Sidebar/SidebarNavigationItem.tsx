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
  const location = useLocation();
  const isOpen = useSidebarStore((state) => state.isOpen);
  return (
    <Link
      className={twMerge(
        "flex flex-col sm:flex-row items-center gap-1 sm:gap-5 py-1 sm:p-[10px] hover:bg-[#332729] rounded-[10px] transition ",
        [
          item.href === location.pathname ? "bg-[#332729]" : "",
          !isOpen && " sm:flex-col  sm:gap-1  sm:py-1",
        ]
      )}
      to={item.href}
      key={item.href}
    >
      <Image
        src={`${
          item.href === location.pathname ? `${item.imgPath}-bg` : item.imgPath
        }.svg`}
        alt={item.title}
        width="24"
        height="24"
      />
      <span className="font-medium leading-6 text-sm sm:text-base">
        {item.title}
      </span>
    </Link>
  );
};

export default SidebarNavigationItem;
