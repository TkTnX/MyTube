import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import Input from "../ui/Input";
import { useUserStore } from "../../stores/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { playlistValidationSchema } from "../../schemas/playlistValidationSchema";
import { z } from "zod";
import axios from "axios";

const createPlaylist = async (data: { title: string; author: string }) => {
  try {
    const playlist = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/playlist`,
      data
    );
    return playlist.data;
  } catch (error) {
    console.log(error);
  }
};

const PlaylistAddForm = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { user } = useUserStore();
  const [errors, setErrors] = useState<z.typeToFlattenedError<
    z.infer<typeof playlistValidationSchema>
  > | null>(null);

  const mutation = useMutation({
    mutationFn: (data: { title: string; author: string }) =>
      createPlaylist(data),
    onSuccess: () => {
      setOpen(false);
      setErrors(null);
    },
  });

  if (!user) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        title: formData.get("title"),
        author: user._id,
      };
      const result = playlistValidationSchema.safeParse(data);
      if (!result.success) return setErrors(result.error.flatten());

      mutation.mutate(result.data);
    } catch (error) {
      console.log(error);
    }
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
        <Box className=" bg-[#1d1d1d] rounded-3xl p-2 sm:p-6 w-full  sm:w-[400px]">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create playlist
          </Typography>
          <form onSubmit={onSubmit} className="mt-4">
            <Input name="title" placeholder="Title" required errors={errors} />
            <button
              className="mt-3 text-center w-full bg-white text-black py-2 rounded-full font-medium hover:opacity-80 transition"
              type="submit"
            >
              Create
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default PlaylistAddForm;
