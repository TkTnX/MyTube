import { useQuery } from "@tanstack/react-query";
import ExploreBlock from "../components/Explore/ExploreBlock";
import axios from "axios";
import { CategoryType } from "../types";
import { ExploreSkeleton } from "../components/Skeletons";

const getCategories = async () => {
  try {
    const categories = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/categories`
    );
    return categories.data;
  } catch (error) {
    console.log(error);
  }
};

const ExplorePage = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  if (isError) return <span>Error: {error.message}</span>;
  if (isPending) return <ExploreSkeleton className="w-full" />;
  return (
    <div className="w-full vsm:h-[calc(100%-80px)] mt-7 flex flex-col gap-7">
      <ExploreBlock
        action="trending"
        imgPath="/icons/trending.svg"
        title="Trending"
      />
      {data.map((category: CategoryType) => (
        <ExploreBlock
          action={category.title.toLowerCase()}
          imgPath={category.img}
          title={category.title}
          videosLength={category?.videos?.length || 0}
        />
      ))}
    </div>
  );
};

export default ExplorePage;
