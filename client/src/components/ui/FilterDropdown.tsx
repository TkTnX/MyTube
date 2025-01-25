import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";
import { MenuItem } from "@mui/material";

const FilterDropdown = ({
  children,
  onFilter,
}: {
  children: React.ReactNode;
  onFilter: (value: "newest" | "popular") => void;
}) => {
  return (
    <Dropdown>
      <MenuButton>{children}</MenuButton>
      <Menu className="bg-[#1f1f1f] py-3 px-6   rounded-2xl">
        <MenuItem className="hover:!bg-[#2a2a2a] py-2 px-3 !rounded-2xl">
          <button
            onClick={() => onFilter("newest")}
            className="flex items-center gap-3"
          >
            Newest
          </button>
        </MenuItem>
        <MenuItem className="hover:!bg-[#2a2a2a] py-2 px-3 !rounded-2xl">
          <button
            onClick={() => onFilter("popular")}
            className="flex items-center gap-3"
          >
            Most popular
          </button>
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default FilterDropdown;
