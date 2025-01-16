import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUserStore } from "../../stores/useUserStore";

const handleLike = async ({
  userId,
  videoId,
}: {
  userId: string;
  videoId: string;
}) => {
  const newLikes = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/videos/like/${videoId}`,
    { userClerkId: userId }
  );

  return newLikes.data.likes;
};

const LikeButtons = ({
  videoId,
  likes,
  dislikes,
}: {
  videoId: string;
  likes: number;
  dislikes: number;
}) => {
  const { user, getUser } = useUserStore();
  const [likesState, setLikesState] = useState(likes);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!user) return toast.error("You must be logged in");

      const newLikes = await handleLike({ userId: user.clerkId, videoId });
      await getUser(user.clerkId);
      setLikesState(newLikes);
    },
  });

  const isLiked =
    mutation.isPending && user?.likedVideos
      ? "#fff"
      : user?.likedVideos.includes(videoId)
      ? "#fff"
      : "none";

  return (
    <div className="rounded-full bg-[#1d1d1d] flex items-center ">
      <button
        onClick={() => mutation.mutate()}
        className="flex items-center gap-2 py-2 px-4 hover:opacity-80 transition"
      >
        <ThumbsUp size={24} color="#fff" fill={isLiked} />
        <span className="font-medium">
          {mutation.isPending
            ? user?.likedVideos.includes(videoId)
              ? likesState - 1
              : likesState + 1
            : likesState}
        </span>
      </button>
      <div className="w-[1px] h-7 bg-[#343434]" />
      <button className="flex items-center gap-2 py-2 px-4 hover:opacity-80 transition">
        <ThumbsDown size={24} color="#fff" />
        <span className="font-medium">{dislikes}</span>
      </button>
    </div>
  );
};

export default LikeButtons;
