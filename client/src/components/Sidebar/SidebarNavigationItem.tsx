import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Image from "../ui/Image";
import { useSidebarStore } from "../../stores/useSidebarStore";
import { SidebarNavigationItemType } from "../../types";
import { useEffect, useState } from "react";

const SidebarNavigationItem = ({
  item,
}: {
  item: SidebarNavigationItemType;
}) => {
  const [isBg, setIsBg] = useState(false);
  const location = useLocation();
  const isOpen = useSidebarStore((state) => state.isOpen);

  useEffect(() => {
    if (item.href === location.pathname) {
      setIsBg(true);
    } else {
      setIsBg(false);
    }
  }, [item.href, location.pathname]);

  return (
    <Link
      className={twMerge(
        "flex flex-col  sm:flex-row items-center gap-1 sm:gap-5 py-1 sm:p-[10px] hover:bg-[#332729] rounded-[10px] transition min-w-[60px] w-full text-[#bababa] ",
        [
          isBg ? "bg-[#332729] text-white" : "",
          !isOpen && " sm:flex-col  sm:gap-1  sm:py-1 text-[#bababa] ",
          isBg && !isOpen && "text-white",
        ]
      )}
      to={item.href}
      key={item.href}
    >
      <Image
        src={`${isBg ? `${item.imgPath}-bg` : item.imgPath}.svg`}
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
