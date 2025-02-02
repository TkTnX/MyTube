import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";
import { MenuItem } from "@mui/base/MenuItem";
import { Flag, Forward, ListVideo, Trash, X } from "lucide-react";
import { VideoType } from "../../types";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useVideoControls } from "../../hooks/useVideoControls";
import VideoAddToPlaylist from "./VideoAddToPlaylist";
import { usePlaylistsControls } from "../../hooks/usePlaylistsControls";
import { useUserStore } from "../../stores/useUserStore";

type Props = {
  video: VideoType;
  children: React.ReactNode;
  isPlaylistPage: boolean;
  playlistId?: string;
};

const VideoDropdown: React.FC<Props> = ({
  video,
  children,
  isPlaylistPage,
  playlistId,
}) => {
  const { user: clerkUser } = useUser();
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const { deleteVideo } = useVideoControls({ videoId: video._id });
  const { removeFromPlaylist } = usePlaylistsControls();
  const deleteMutation = useMutation({
    mutationFn: () => deleteVideo(video._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });

  const removeFromPlaylistMutation = useMutation({
    mutationFn: () => removeFromPlaylist(video._id, playlistId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlist", playlistId] });
    },
  });


  return (
    <Dropdown>
      <MenuButton className="relative z-[1]">{children}</MenuButton>
      <Menu className="bg-[#1f1f1f] pt-5 px-6   rounded-[20px] relative z-[1] w-80 ">
        {clerkUser?.id === video.author.clerkId && (
          <MenuItem className="!mb-5">
            <button
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
              className="flex items-center gap-3 hover:opacity-80  rounded-2xl w-full disabled:opacity-50 disabled:pointer-events-none"
            >
              <Trash /> <span>Delete</span>
            </button>
          </MenuItem>
        )}
        {isPlaylistPage && user?.playlists.find((p) => p._id === playlistId!) ? (
          <MenuItem className="!mb-5">
            <button
              onClick={() => removeFromPlaylistMutation.mutate()}
              className="flex items-center gap-3 hover:opacity-80  rounded-2xl w-full"
            >
              <X /> <span>Remove from playlist</span>
            </button>
          </MenuItem>
        ) : (
          <MenuItem className="!mb-5">
            <VideoAddToPlaylist videoId={video._id}>
              <button className="flex items-center gap-3 hover:opacity-80  rounded-2xl w-full">
                <ListVideo /> <span>Add to playlist</span>
              </button>
            </VideoAddToPlaylist>
          </MenuItem>
        )}

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
