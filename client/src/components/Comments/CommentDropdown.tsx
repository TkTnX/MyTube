import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCommentControls } from "../../hooks/useCommentControls";

const CommentDropdown = ({
  children,
  commentId,
}: {
  children: React.ReactNode;
  commentId: string;
}) => {
  const { deleteComment } = useCommentControls();
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
