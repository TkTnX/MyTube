import { Link } from "react-router-dom";
import { CommentType } from "../../types";
import { format } from "timeago.js";
import { MoreVertical } from "lucide-react";
import { useUserStore } from "../../stores/useUserStore";
import AvatarLink from "../ui/AvatarLink";
import CommentDropdown from "./CommentDropdown";
import CommentLikes from "./CommentLikes";
import CommentReply from "./CommentReply";
import { useState } from "react";
import CommentForm from "./CommentForm";

const CommentItem = ({
  comment,
  className,
}: {
  comment: CommentType;
  className?: string;
}) => {
  const [openReplyForm, setOpenReplyForm] = useState(false);
  const [openReplies, setOpenReplies] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { user } = useUserStore();
  if (!comment) return null;
  return (
    <div className={`flex items-start gap-3 w-full ${className}`}>
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
          {openEdit ? (
            <CommentForm
              commentId={comment._id}
              action="edit"
              setOpen={setOpenEdit}
            />
          ) : (
            <p className="mt-2">{comment.text}</p>
          )}

          <div className="flex items-center gap-5 mt-4">
            {/* like / dislike */}
            <CommentLikes comment={comment} />
            {/* reply */}
            {!comment.replyTo && (
              <CommentReply
                commentReplies={comment.replies.length}
                setOpenReplies={setOpenReplies}
                setOpenReplyForm={setOpenReplyForm}
              />
            )}
          </div>
          {openReplyForm && (
            <CommentForm
              commentId={comment._id}
              action="reply"
              setOpen={setOpenReplyForm}
            />
          )}
          {openReplies && comment.replies.length > 0 && (
            <div className="mt-4">
              {comment.replies.map((reply) => (
                <CommentItem key={reply._id} comment={reply} className="mt-5" />
              ))}
            </div>
          )}
        </div>
      </div>
      {user?._id === comment.author._id && (
        <CommentDropdown setOpenEdit={setOpenEdit} commentId={comment._id}>
          <button>
            <MoreVertical />
          </button>
        </CommentDropdown>
      )}
    </div>
  );
};

export default CommentItem;
