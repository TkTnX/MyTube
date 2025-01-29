import { Link } from "react-router-dom";
import Image from "../ui/Image";
import ExploreBlockFilters from "./ExploreBlockFilters";
import ExploreBlockVideos from "./ExploreBlockVideos";
import { useState } from "react";

const ExploreBlock = ({
  imgPath,
  title,
  action,
}: {
  imgPath: string;
  title: string;
  action: string;
  }) => {
  const [currentFilter, setCurrentFilter] = useState(0);
  return (
    <div className="w-full border border-[#333333] rounded-3xl p-6">
      <div className="border-b border-[#333333] ">
        <div className="flex items-center justify-between  pb-7 flex-wrap gap-3">
          <div className="flex items-center gap-6">
            <Image src={imgPath} alt={title} width="44" height="44" />
            <h6 className="font-medium text-2xl tracking-[-0.01em]">{title}</h6>
          </div>
          <Link
            className="bg-[#1d1d1d] rounded-3xl py-2 px-6 hover:opacity-80 transition"
            to={`/explore/${title.toLowerCase()}`}
          >
            View all
          </Link>
        </div>
        <ExploreBlockFilters
          setCurrentFilter={setCurrentFilter}
          currentFilter={currentFilter}
        />
      </div>
      {/* Videos */}
      <ExploreBlockVideos currentFilter={currentFilter} category={action} />
    </div>
  );
};

export default ExploreBlock;
