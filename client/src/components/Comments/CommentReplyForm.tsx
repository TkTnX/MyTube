import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { toast } from "react-toastify";
import axios from "axios";

const answerComment = async (
  commentId: string,
  text: string,
  userId: string
) => {
  try {
    const comment = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/comments/answer/${commentId}`,
      {
        text,
        author: userId,
      }
    );

    return comment.data;
  } catch (error) {
    console.log(error);
  }
};

const CommentReplyForm = ({
  setOpenReplyForm,
  replyToCommentId,
}: {
  setOpenReplyForm: React.Dispatch<React.SetStateAction<boolean>>;
  replyToCommentId: string;
}) => {
  const { user } = useUserStore();
  const [value, setValue] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!user) return toast.error("You must be logged in");

      await answerComment(replyToCommentId, value, user._id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      setOpenReplyForm(false);
      setValue("");
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!user) return toast.error("You must be logged in");
      if (value.length === 0) return toast.error("You must write a comment");
      mutation.mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full rounded-lg border border-[#2a2a2a] pr-3 mt-3"
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Type answer..."
        className="flex-1 bg-inherit p-4  placeholder:text-[#888888] outline-none"
      />
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="hover:opacity-80 transition"
          onClick={() => setOpenReplyForm(false)}
        >
          Cancel
        </button>
        {value.length > 0 && (
          <button type="submit" className="hover:opacity-80 transition">
            <Send />
          </button>
        )}
      </div>
    </form>
  );
};

export default CommentReplyForm;
