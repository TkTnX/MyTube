import axios from "axios";
import { toast } from "react-toastify";

export const useCommentControls = () => {
  // ФУНКЦИЯ ЛАЙКА
  const handleLikeComment = async (commentId: string, userId: string) => {
    try {
      const comment = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/comments/like/${commentId}`,
        { userId }
      );
      return comment.data;
    } catch (error) {
      console.log(error);
    }
  };

  // ФУНКЦИЯ ДИЗЛАЙКА
  const handleDislikeComment = async (commentId: string, userId: string) => {
    try {
      const comment = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/comments/dislike/${commentId}`,
        { userId }
      );

      return comment.data;
    } catch (error) {
      console.log(error);
    }
  };

  // ФУНКЦИЯ УДАЛЕНИЯ КОММЕНТАРИЯ

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

  // ФУНКЦИЯ СОЗДАНИЯ КОММЕНТАРИЯ

  const addComment = async (
    videoId: string,
    text: string,
    authorId: string
  ) => {
    try {
      const comment = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/comments/${videoId}`,
        {
          text,
          author: authorId,
        }
      );

      if (!comment) return toast.error("Comment not created");

      return comment.data;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return {
    handleLikeComment,
    handleDislikeComment,
    deleteComment,
    addComment,
  };
};
