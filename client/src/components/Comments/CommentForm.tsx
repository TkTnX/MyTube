import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useCommentControls } from "../../hooks/useCommentControls";
import { useUserStore } from "../../stores/useUserStore";
import { Send } from "lucide-react";

const CommentForm = ({
  commentId,
  action,
  setOpen,
}: {
  commentId: string;
  action: "reply" | "edit";
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [value, setValue] = useState("");
  const { answerComment, editComment } = useCommentControls();
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (action: "reply" | "edit") => {
      if (!user) return toast.error("You must be logged in");

      if (action === "reply") {
        await answerComment(commentId, value, user._id);
      } else if (action === "edit") {
        await editComment(commentId, value);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      setOpen(false);
      setValue("");
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (value.length === 0) return toast.error("You must write a comment");
      mutation.mutate(action);
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
        placeholder={`Type ${action === "reply" ? "answer" : "new comment"}`}
        className="flex-1 bg-inherit p-4  placeholder:text-[#888888] outline-none"
      />
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="hover:opacity-80 transition"
          onClick={() => setOpen(false)}
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

export default CommentForm;
