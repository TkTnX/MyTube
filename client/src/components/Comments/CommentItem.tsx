import { Link } from "react-router-dom";
import { CommentType } from "../../types";
import { format } from "timeago.js";
import { ThumbsDown, ThumbsUp } from "lucide-react";

const CommentItem = ({ comment }: { comment: CommentType }) => {
  if (!comment) return null;
  return (
    <div className="flex items-start gap-3 w-full">
      <Link to={`/channel/${comment.author.username}`}>
        <img
          src={comment.author.img}
          width="43"
          height="43"
          alt={comment.author.username}
          className="rounded-full object-cover min-w-[43px] min-h-[43px]"
        />
      </Link>
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
        {/* // TODO: доделать дизайн */}
        <div className="flex items-center gap-5 mt-4">
          {/* like / dislike */}
          <div className="flex items-center gap-2">
            <button>
              <ThumbsUp size={24} />
            </button>
            <button>
              <ThumbsDown size={24} />
            </button>
          </div>
          {/* reply */}
          <button className="font-medium text-sm">Reply</button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
