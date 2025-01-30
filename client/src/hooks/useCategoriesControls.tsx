import axios from "axios";

export const useCategoriesControls = () => {
  // ПОЛУЧЕНИЕ СПИСКА КАТЕГОРИИ
  const getCategories = async ({
    category = null,
    populateVideos = false,
  }: {
    category?: string | null;
    populateVideos?: boolean;
  }) => {
    const QCategory = category ? "findCategory=" + category : "";
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/categories?${QCategory}&populateVideos=${populateVideos}`
    );
    if (!category) {
      data.unshift({ title: "All", _id: "All" });
    }
    return data;
  };

  return {
    getCategories,
  };
};
