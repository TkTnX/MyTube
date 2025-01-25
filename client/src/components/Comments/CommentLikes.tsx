import { ThumbsDown, ThumbsUp } from "lucide-react";
import { CommentType } from "../../types";

const CommentLikes = ({ comment }: { comment: CommentType }) => {
  return (
    <div className="flex items-center  sm:bg-[#1d1d1d]  rounded-full">
      <button className="flex items-center gap-2 px-2 sm:py-2 sm:px-4 sm:hover:bg-[#2a2a2a] rounded-l-full">
        <ThumbsUp size={24} />
        <span>{comment.likes.length}</span>
      </button>
      <div className="w-[1px] h-4 bg-[#343434]" />
      <button className="flex items-center gap-2 px-2 sm:py-2 sm:px-4 sm:hover:bg-[#2a2a2a] rounded-r-full">
        <ThumbsDown size={24} />
        <span>{comment.dislikes.length}</span>
      </button>
    </div>
  );
};

export default CommentLikes;
