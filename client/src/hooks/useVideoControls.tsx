import axios from "axios";
import { VideoType } from "../types";
type getVideosProps = {
  category?: string;
  limit?: number;
  sortQuery?: string;
  searchQuery?: string;
  takeDate?: string;
};

export const useVideoControls = ({ videoId }: { videoId: string }) => {
  // ФУНКЦИЯ ПОЛУЧЕНИЯ СПИСКА ВИДЕО

  const getVideos = async ({
    category,
    limit,
    sortQuery,
    searchQuery,
    takeDate,
  }: getVideosProps): Promise<VideoType[]> => {
    try {
      const videos = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/videos`,
        { params: { category, limit, sortQuery, searchQuery, takeDate } }
      );

      return videos.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // ФУНКЦИЯ ПОЛУЧЕНИЯ ВИДЕО

  const getVideo = async (id: string, clerkUserId: string | null): Promise<VideoType | null> => {
    try {
      const video = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/videos/${id}`,
        {
          params: { clerkUserId },
        }
      );

      return video.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // ФУНКЦИЯ ОБНОВЛЕНИЯ ВИДЕО

  const updateVideo = async (data: VideoType) => {
    try {
      return await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/videos/${data._id}`,
        {
          views: data.views + 1,
        }
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  };

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

  // ФУНКЦИЯ УДАЛЕНИЯ ВИДЕО

  const deleteVideo = async (videoId: string) => {
    try {
      const video = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/videos/${videoId}`
      );
      return video.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getVideos,
    getVideo,
    updateVideo,
    handleLike,
    handleDislike,
    getIconColor,
    getNewCount,
    deleteVideo,
  };
};
