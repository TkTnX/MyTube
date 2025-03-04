import { useUserStore } from "../../stores/useUserStore";
import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import AvatarLink from "../ui/AvatarLink";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCommentControls } from "../../hooks/useCommentControls";


const AddComment = ({ videoId }: { videoId: string }) => {
  const [value, setValue] = useState("");
  const { user } = useUserStore();
  const { addComment } = useCommentControls();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!user) return toast.error("You must be logged in");
      await addComment(videoId, value, user._id);
      setValue("");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", videoId] });
    },
  });

  if (!user) return null;

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
    <div className="flex items-center gap-5 w-full mt-8">
      <AvatarLink
        username={user.username}
        img={user.img}
        width="43"
        height="43"
      />
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full rounded-lg border border-[#2a2a2a] pr-3"
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Add a comment..."
          className="flex-1 bg-inherit p-4  placeholder:text-[#888888] outline-none"
        />
        {value.length > 0 && (
          <button className="hover:opacity-80 transition">
            <Send />
          </button>
        )}
      </form>
    </div>
  );
};

export default AddComment;
