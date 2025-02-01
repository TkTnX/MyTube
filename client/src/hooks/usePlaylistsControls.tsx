import axios from "axios";

export const usePlaylistsControls = () => {
  // ПОЛУЧЕНИЕ ПЛЕЙЛИСТОВ

  const getUserPlaylists = async (username: string, sort?: string) => {
    try {
      const playlists = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/playlist/${username}${
          sort ? `?sort=${sort}` : ""
        }`
      );
      return playlists.data;
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

  return {
    getUserPlaylists,
    createPlaylist,
    deletePlaylist,
    editPlaylist,
  };
};
