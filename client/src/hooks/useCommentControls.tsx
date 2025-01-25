import axios from "axios";

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

  return {
    handleLikeComment,
    handleDislikeComment,
  };
};
