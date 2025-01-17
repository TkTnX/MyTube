import axios from "axios";

export const useVideoControls = ({ videoId }: { videoId: string }) => {
  // ФУНКЦИЯ ЛАЙКА
  const handleLike = async ({
    userId,
    videoId,
  }: {
    userId: string;
    videoId: string;
  }) => {
    const newLikes = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/videos/like/${videoId}`,
      { userClerkId: userId }
    );

    return newLikes.data;
  };

  // ФУНКЦИЯ ДИЗЛАЙКА

  const handleDislike = async ({
    userId,
    videoId,
  }: {
    userId: string;
    videoId: string;
  }) => {
    const newDislikes = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/videos/dislike/${videoId}`,
      { userClerkId: userId }
    );

    return newDislikes.data;
  };

  // ФУНКЦИЯ ИКОНКИ ЛАЙКА/ДИЗЛАЙКА

  const getIconColor = (
    mutation: { isPending: boolean },
    userVideos: string[] | undefined
  ) => {
    if (mutation.isPending && userVideos) return "#fff";
    return userVideos?.includes(videoId) ? "#fff" : "none";
  };

  // ФУНКЦИЯ КОЛИЧЕСТВА ЛАЙКОВ/ДИЗЛАЙКОВ

  const getNewCount = (
    mutation: { isPending: boolean },
    userVideos: string[] | undefined,
    count: number
  ) => {
    if (!mutation.isPending) return count;
    return userVideos?.includes(videoId) ? count - 1 : count + 1;
  };

  return {
    handleLike,
    handleDislike,
    getIconColor,
    getNewCount,
  };
};
