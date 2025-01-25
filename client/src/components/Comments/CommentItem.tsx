import { Link } from "react-router-dom";
import { CommentType } from "../../types";
import { format } from "timeago.js";
import { MoreVertical } from "lucide-react";
import { useUserStore } from "../../stores/useUserStore";
import AvatarLink from "../ui/AvatarLink";
import CommentDropdown from "./CommentDropdown";
import CommentLikes from "./CommentLikes";
import CommentReply from "./CommentReply";

const CommentItem = ({ comment }: { comment: CommentType }) => {
  const { user } = useUserStore();

  if (!comment) return null;

  return (
    <div className="flex items-start gap-3 w-full">
      <div className="flex flex-col sm:flex-row w-full gap-3">
        <AvatarLink
          username={comment.author.username}
          img={comment.author.img}
          width="43"
          height="43"
          className="sm:min-w-[43px] sm:min-h-[43px]"
        />

        <div className="w-full">
          <div className=" flex items-center gap-2">
            <Link
              className="text-sm font-medium"
              to={`/channel/${comment.author.username}`}
            >
              {comment.author.username}
            </Link>
            <span className="text-xs text-[#aaa]">
              {format(comment.createdAt)}
            </span>
          </div>
          <p className="mt-2">{comment.text}</p>
          <div className="flex items-center gap-5 mt-4">
            {/* like / dislike */}
            <CommentLikes comment={comment} />
            {/* reply */}
            <CommentReply />
          </div>
        </div>
      </div>
      {user?._id === comment.author._id && (
        <CommentDropdown commentId={comment._id}>
          <button>
            <MoreVertical />
          </button>
        </CommentDropdown>
      )}
    </div>
  );
};

export default CommentItem;
