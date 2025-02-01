import { Box, Checkbox, Modal } from "@mui/material";
import { useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import Image from "./Image";
import { Minus, Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePlaylistsControls } from "../../hooks/usePlaylistsControls";

const VideoAddToPlaylist = ({
  children,
  videoId,
}: {
  children: React.ReactNode;
  videoId: string;
}) => {
  const [open, setOpen] = useState(false);
  const { user, loading, getUser } = useUserStore();
  const queryClient = useQueryClient();
  const { addVideoToPlaylist } = usePlaylistsControls();

  const mutation = useMutation({
    mutationFn: (playlistId: string) => addVideoToPlaylist(playlistId, videoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      setOpen(false);
      getUser(user?.clerkId as string, "playlists");
    },
  });

  if (!user || !user.playlists) return null;

  const isAddedToPlaylist = (playlistId: string) => {
    const playlist = user.playlists.find((p) => p._id === playlistId);
    if (!playlist || !playlist.videos) return false;
    return !!playlist.videos.find((v) => v._id === videoId);
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>{children}</button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center "
      >
        <Box className="bg-[#1d1d1d] rounded-3xl p-2 sm:p-6   sm:w-auto flex flex-col gap-4 !w-[400px]">
          <h2 className="text-2xl font-bold">Add to playlist</h2>
          <p className="text-[#888]">Select a playlist to add to</p>
          {!loading ? (
            user?.playlists?.map((playlist) => (
              <button
                onClick={() => mutation.mutate(playlist._id)}
                className="flex items-center justify-between gap-3 hover:bg-[#333] p-2 rounded-2xl"
                key={playlist._id}
              >
                <div className="flex items-start gap-3">
                  <Checkbox checked={isAddedToPlaylist(playlist._id)} />
                  {playlist?.videos?.length > 0 ? (
                    <Image
                      src={playlist?.videos[0]?.previewUrl as string}
                      alt={playlist.title}
                      width="50"
                      height="50"
                      className="object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-[50px] h-[50px] bg-[#555555]" />
                  )}
                  <p>{playlist.title}</p>
                </div>
                {isAddedToPlaylist(playlist._id) ? <Minus /> : <Plus />}
              </button>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default VideoAddToPlaylist;
