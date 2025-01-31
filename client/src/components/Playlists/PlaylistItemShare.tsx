import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

const PlaylistItemShare = ({
  children,
  playlistId,
}: {
  children: React.ReactNode;
  playlistId: string;
}) => {
  const [open, setOpen] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(
      `http:localhost:5173/playlists/${playlistId}`
    );
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="">
      <button onClick={() => setOpen(true)}>{children}</button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center "
      >
        <Box className=" bg-[#1d1d1d] rounded-3xl p-2 sm:p-6 w-full  sm:w-auto">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Share
          </Typography>
          <div className="flex items-center w-full flex-col vsm:flex-row justify-center gap-4 bg-black py-2 px-4 rounded-lg mt-4">
            <p className="big-text-one w-full">
              http:localhost:5173/playlists/{playlistId}
            </p>
            <button
              onClick={onCopy}
              className="bg-[#65b8ff] py-2 px-4 rounded-full text-black hover:opacity-80 transition"
            >
              Copy
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PlaylistItemShare;
