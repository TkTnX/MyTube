import axios from "axios";

export const usePlaylistsControls = () => {
  // ПОЛУЧЕНИЕ ПЛЕЙЛИСТОВ ПО TITLE

  const getPlaylists = async ({
    title,
    sortVideos,
  }: {
    title: string;
    sortVideos?: string;
  }) => {
    try {
      const playlists = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/playlist/${title}`,
        { params: { sortVideos } }
      );
      return playlists.data;
    } catch (error) {
      console.log(error);
    }
  };

  // ПОЛУЧЕНИЕ ПЛЕЙЛИСТОВ ПОЛЬЗОВАТЕЛЯ

  const getUserPlaylists = async (username: string, sort?: string) => {
    try {
      const playlists = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/playlist/user/${username}`,
        { params: { sort } }
      );
      return playlists.data;
    } catch (error) {
      console.log(error);
    }
  };

  // ПОЛУЧЕНИЕ 1 ПЛЕЙЛИСТА

  const getPlaylist = async (
    playlistId: string,
    username: string,
    sort?: string
  ) => {
    try {
      const playlist = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/playlist/${username}/${playlistId}${
          sort !== "" ? `?sort=${sort}` : ""
        }`
      );

      return playlist.data;
    } catch (error) {
      console.log(error);
    }
  };

  // СОЗДАНИЕ ПЛЕЙЛИСТА

  const createPlaylist = async (data: {
    title: string;
    authorClerkId: string;
  }) => {
    try {
      const playlist = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/playlist`,
        data
      );
      return playlist.data;
    } catch (error) {
      console.log(error);
    }
  };

  // УДАЛЕНИЕ ПЛЕЙЛИСТА

  const deletePlaylist = async (playlistId: string) => {
    try {
      const playlist = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/playlist/${playlistId}`
      );

      return playlist.data;
    } catch (error) {
      console.log(error);
    }
  };

  // РЕДАКТИРОВАНИЕ ПЛЕЙЛИСТА

  const editPlaylist = async (
    data: { title: string; authorClerkId: string },
    playlistId: string
  ) => {
    try {
      const playlist = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/playlist/${playlistId}`,
        data
      );

      return playlist.data;
    } catch (error) {
      console.log(error);
    }
  };

  // ДОБАВЛЕНИЕ ВИДЕО В ПЛЕЙЛИСТ
  const addVideoToPlaylist = async (playlistId: string, videoId: string) => {
    try {
      const playlist = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/playlist/${playlistId}/${videoId}`
      );
      return playlist.data;
    } catch (error) {
      console.log(error);
    }
  };

  // УДАЛЕНИЕ ВИДЕО ИЗ ПЛЕЙЛИСТА

  const removeFromPlaylist = async (videoId: string, playlistId: string) => {
    try {
      const playlist = await axios.patch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/playlist/remove/${playlistId}/${videoId}`
      );
      return playlist.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getPlaylists,
    getUserPlaylists,
    createPlaylist,
    deletePlaylist,
    editPlaylist,
    addVideoToPlaylist,
    getPlaylist,
    removeFromPlaylist,
  };
};
