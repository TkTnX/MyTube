import { ThumbsDown, ThumbsUp } from "lucide-react";
import { CommentType } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../stores/useUserStore";
import { useState } from "react";
import { useCommentControls } from "../../hooks/useCommentControls";


const CommentLikes = ({ comment }: { comment: CommentType }) => {
  const { user } = useUserStore();
  const { handleDislikeComment, handleLikeComment } = useCommentControls();
  const queryClient = useQueryClient();
  const [likeValues, setLikeValues] = useState({
    likes: comment.likes.length,
    dislikes: comment.dislikes.length,
  });
  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!user) return null;
      const res = await handleLikeComment(comment._id, user._id);
      setLikeValues({
        likes: res.likes,
        dislikes: res.dislikes,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: async () => {
      if (!user) return null;
      const res = await handleDislikeComment(comment._id, user._id);
      setLikeValues({
        likes: res.likes,
        dislikes: res.dislikes,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  return (
    <div className="flex items-center  sm:bg-[#1d1d1d]  rounded-full">
      <button
        onClick={() => likeMutation.mutate()}
        className="flex items-center gap-2 px-2 sm:py-2 sm:px-4 sm:hover:bg-[#2a2a2a] rounded-l-full"
      >
        <ThumbsUp
          fill={comment.likes.includes(user?._id as string) ? "#fff" : "none"}
          size={24}
        />
        <span>{likeValues.likes}</span>
      </button>
      <div className="w-[1px] h-4 bg-[#343434]" />
      <button
        onClick={() => dislikeMutation.mutate()}
        className="flex items-center gap-2 px-2 sm:py-2 sm:px-4 sm:hover:bg-[#2a2a2a] rounded-r-full"
      >
        <ThumbsDown
          fill={
            comment.dislikes.includes(user?._id as string) ? "#fff" : "none"
          }
          size={24}
        />
        <span>{likeValues.dislikes}</span>
      </button>
    </div>
  );
};

export default CommentLikes;
