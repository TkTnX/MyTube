import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";
import { MenuItem } from "@mui/base/MenuItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash } from "lucide-react";
import { usePlaylistsControls } from "../../hooks/usePlaylistsControls";
import PlaylistAddForm from "./PlaylistAddForm";
import { useUser } from "@clerk/clerk-react";

type Props = {
  children: React.ReactNode;
  playlistId: string;
};

const PlaylistDropdown: React.FC<Props> = ({ children, playlistId }) => {
  const { user } = useUser();
  const { deletePlaylist } = usePlaylistsControls();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deletePlaylist(playlistId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["playlists"] }),
  });

  return (
    <Dropdown>
      <MenuButton>{children}</MenuButton>
      <Menu className="bg-[#1f1f1f] py-5 px-6   rounded-[20px]  w-80 ">
        <MenuItem>
          <button
            onClick={() => mutation.mutate()}
            className="flex items-center gap-3 hover:opacity-80  rounded-2xl w-full"
          >
            <Trash /> <span>Delete</span>
          </button>
        </MenuItem>
        <MenuItem className="!mt-5 !w-full">
          <PlaylistAddForm
            userId={user?.id as string}
            type="edit"
            playlistId={playlistId}
          >
            <button
              className="flex items-center gap-3 hover:opacity-80  rounded-2xl w-full"
            >
              <Edit /> <span>Edit</span>
            </button>
          </PlaylistAddForm>
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default PlaylistDropdown;
