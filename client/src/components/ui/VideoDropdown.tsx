import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";
import { MenuItem } from "@mui/base/MenuItem";
import { Flag, Forward, ListVideo, Trash } from "lucide-react";
import { VideoType } from "../../types";
import { useUser } from "@clerk/clerk-react";

const VideoDropdown = ({
  video,
  children,
}: {
  video: VideoType;
  children: React.ReactNode;
}) => {
  const { user } = useUser();
  console.log(user?.id, video.author);
  return (
    <Dropdown>
      <MenuButton className="relative z-[1]">{children}</MenuButton>
      <Menu className="bg-[#1f1f1f] pt-5 px-6   rounded-[20px] relative z-[1] w-80 ">
        {user?.id === video.author.clerkId && (
          <MenuItem className="!mb-5">
            <button className="flex items-center gap-3 hover:opacity-80  rounded-2xl w-full">
              <Trash /> <span>Delete</span>
            </button>
          </MenuItem>
        )}
        <MenuItem className="!mb-5">
          <button className="flex items-center gap-3 hover:opacity-80  rounded-2xl w-full">
            <ListVideo /> <span>Add to playlist</span>
          </button>
        </MenuItem>
        <MenuItem className="!mb-5">
          <button className="flex items-center gap-3 hover:opacity-80  rounded-2xl w-full">
            <Forward /> <span>Share</span>
          </button>
        </MenuItem>
        <MenuItem className="!mb-5">
          <button className="flex items-center gap-3 hover:opacity-80  rounded-2xl w-full">
            <Flag /> <span>Report</span>
          </button>
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default VideoDropdown;
