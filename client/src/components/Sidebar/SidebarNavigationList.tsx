import { Link, useLocation } from "react-router-dom";
import { SidebarNavigationItemType } from "../../types";
import { twMerge } from "tailwind-merge";

const SidebarNavigationList = ({
  items,
}: {
  items: SidebarNavigationItemType[];
}) => {
  const location = useLocation();
  return (
    <nav className="border-b border-[#343434] py-6">
      {items.map((item) => (
        <Link
          className={twMerge(
            "flex items-center gap-5 p-[10px] hover:bg-[#332729] rounded-[10px] transition",
            item.href === location.pathname ? "bg-[#332729]" : ""
          )}
          to={item.href}
          key={item.href}
        >
          <img
            src={`/icons/sidebar${
              item.href === location.pathname
                ? `${item.href === "/" ? "/home" : item.href}-bg`
                : item.href === "/"
                ? "/home"
                : item.href
            }.svg`}
            alt={item.title}
          />
          <span className="font-medium leading-6">{item.title}</span>
        </Link>
      ))}
    </nav>
  );
};

export default SidebarNavigationList;
