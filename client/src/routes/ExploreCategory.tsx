import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useCategoriesControls } from "../hooks/useCategoriesControls";
import Image from "../components/ui/Image";
import VideosListItem from "../components/ui/VideosListItem";
import { VideoType } from "../types";

const ExploreCategoryPage = () => {
  const { category: categoryParams } = useParams();
  const { getCategories } = useCategoriesControls();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["category", categoryParams],
    queryFn: () =>
      getCategories({ category: categoryParams, populateVideos: true }),
  });

  if (isError) return <span>Error: {error?.message}</span>;
  if (isPending) return <div>Loading...</div>;
  return (
    <div className="">
      <div className="flex items-center gap-6">
        <Image
          src={data[0].img}
          alt={data[0].title}
          className="bg-white rounded-full object-cover"
          width="44"
          height="44"
        />
        <h6 className="font-medium text-2xl tracking-[-0.01em]">
          {data[0].title}
        </h6>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {data[0].videos.map((video: VideoType) => (
          <VideosListItem key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default ExploreCategoryPage;
