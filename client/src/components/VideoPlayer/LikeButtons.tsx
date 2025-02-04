import { useMutation } from "@tanstack/react-query";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUserStore } from "../../stores/useUserStore";
import { useVideoControls } from "../../hooks/useVideoControls";
import { twMerge } from "tailwind-merge";

type Props = {
  videoId: string;
  likes: number;
  dislikes: number;
  className?: string;
};

const LikeButtons: React.FC<Props> = ({
  videoId,
  likes,
  dislikes,
  className,
}) => {
  const { user, getUser } = useUserStore();
  const [likesState, setLikesState] = useState(likes);
  const [dislikesState, setDislikesState] = useState(dislikes);
  const { getIconColor, getNewCount, handleLike, handleDislike } =
    useVideoControls({ videoId });

  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!user) return toast.error("You must be logged in");

      const newLikes = await handleLike({ userId: user.clerkId, videoId });
      await getUser(user.clerkId);
      setLikesState(newLikes.likes);
      setDislikesState(newLikes.dislikes ?? dislikesState);
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: async () => {
      if (!user) return toast.error("You must be logged in");

      const newDislikes = await handleDislike({
        userId: user.clerkId,
        videoId,
      });
      await getUser(user.clerkId);

      setDislikesState(newDislikes.dislikes);
      setLikesState(newDislikes.likes ?? likesState);
    },
  });

  return (
    <div
      className={twMerge(
        "rounded-full bg-[#1d1d1d] flex items-center ",
        className
      )}
    >
      <button
        onClick={() => likeMutation.mutate()}
        className="flex items-center gap-2 py-2 px-4 hover:opacity-80 transition"
      >
        <ThumbsUp
          size={24}
          color="#fff"
          fill={getIconColor(likeMutation, user?.likedVideos as string[])}
        />
        <span className="font-medium">
          {getNewCount(likeMutation, user?.likedVideos as string[], likesState)}
        </span>
      </button>
      <div className="w-[1px] h-7 bg-[#343434]" />
      <button
        onClick={() => dislikeMutation.mutate()}
        className="flex items-center gap-2 py-2 px-4 hover:opacity-80 transition"
      >
        <ThumbsDown
          size={24}
          color="#fff"
          fill={getIconColor(dislikeMutation, user?.dislikedVideos)}
        />
        <span className="font-medium">
          {getNewCount(dislikeMutation, user?.dislikedVideos, dislikesState)}
        </span>
      </button>
    </div>
  );
};

export default LikeButtons;
