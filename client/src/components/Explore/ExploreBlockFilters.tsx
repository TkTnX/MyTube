import { useState } from "react";
import { ExploreFilters } from "../../constants";
import { twMerge } from "tailwind-merge";
import { useSearchParams } from "react-router-dom";

const ExploreBlockFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentFilter, setCurrentFilter] = useState(
    searchParams.get("sortQuery")
      ? ExploreFilters.indexOf(searchParams.get("sortQuery") || "")
      : 0
  );

  const onChange = (index: number) => {
    setCurrentFilter(index);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      sortQuery: ExploreFilters[index],
    });
  };

  return (
    <div className="flex gap-4">
      {ExploreFilters.map((filter, index) => (
        <button
          className={twMerge(
            "font-medium text-sm leading-5 text-[#aaa] relative pb-3",
            [
              currentFilter === index &&
                "text-white after:[content:''] after:bg-[#fa0044] after:absolute after:bottom-0 after:w-full after:block after:rounded-t-full  after:h-[3px] ",
            ]
          )}
          onClick={() => onChange(index)}
          key={index}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default ExploreBlockFilters;
