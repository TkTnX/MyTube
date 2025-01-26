import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";
import { MenuItem } from "@mui/base/MenuItem";
import { Trash } from "lucide-react";

const VideoDropdown = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dropdown>
      <MenuButton className="relative z-[1]">{children}</MenuButton>
      <Menu className="bg-[#1f1f1f] py-3 px-6   rounded-2xl relative z-[1]">
        <MenuItem>
          <button className="flex items-center gap-3 hover:bg-[#2a2a2a] py-2 px-3 rounded-2xl">
            <Trash /> <span>Delete</span>
          </button>
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default VideoDropdown;
