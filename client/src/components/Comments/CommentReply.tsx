import { MessageSquareMoreIcon } from "lucide-react";

const CommentReply = ({
  setOpenReplyForm,
  setOpenReplies,
  commentReplies,
}: {
  setOpenReplyForm: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenReplies: React.Dispatch<React.SetStateAction<boolean>>;
  commentReplies: number;
}) => {
  return (
    <>
      <div className="flex items-center  sm:bg-[#1d1d1d]  rounded-full">
        <button
          onClick={() => setOpenReplies((prev: boolean) => !prev)}
          className="hidden sm:flex py-2 px-4  items-center gap-2 text-[#ffaabb] hover:bg-[#2a2a2a] rounded-l-full"
        >
          <MessageSquareMoreIcon size={24} />
          <p>{commentReplies}</p>
        </button>
        <div className="hidden sm:block w-[1px] h-4 bg-[#343434]" />

        <button
          onClick={() => setOpenReplyForm((prev: boolean) => !prev)}
          className="font-medium text-sm py-2 px-4 sm:hover:bg-[#2a2a2a] rounded-r-full"
        >
          Reply
        </button>
      </div>
    </>
  );
};

export default CommentReply;
