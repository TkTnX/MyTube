import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deleteComment = async (commentId: string) => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/comments/${commentId}`
    );
    if (!res) return null;
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const CommentDropdown = ({
  children,
  commentId,
}: {
  children: React.ReactNode;
  commentId: string;
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  return (
    <Dropdown>
      <MenuButton>{children}</MenuButton>
      <Menu className="bg-[#1f1f1f] py-3 px-6   rounded-2xl">
        <MenuItem>
          <button
            onClick={() => mutation.mutate()}
            className="flex items-center gap-3 hover:bg-[#2a2a2a] py-2 px-3 rounded-2xl"
          >
            <Trash /> <span>Delete</span>
          </button>
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default CommentDropdown;
