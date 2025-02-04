import axios from "axios";

export const useChannelControls = () => {
  // ПОЛУЧЕНИЕ КАНАЛОВ ПО USERNAME

  const getAuthors = async ({ username }: { username: string }) => {
    try {
      const authors = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/channels/search/${username}`
      );

      return authors.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { getAuthors };
};
