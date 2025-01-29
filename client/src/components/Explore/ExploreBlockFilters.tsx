import { ExploreFilters } from "../../constants";
import { twMerge } from "tailwind-merge";

const ExploreBlockFilters = ({
  setCurrentFilter,
  currentFilter,
}: {
  setCurrentFilter: (index: number) => void;
  currentFilter: number;
}) => {
  const onChange = (index: number) => {
    setCurrentFilter(index);
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
