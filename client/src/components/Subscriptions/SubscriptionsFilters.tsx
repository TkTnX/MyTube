import { twMerge } from "tailwind-merge";
import { SubscriptionsFiltersList } from "../../constants";
import { useState } from "react";
import { Search } from "lucide-react";
import { useLocation, useSearchParams } from "react-router-dom";

const SubscriptionsFilters = ({
  setValue,
}: {
  setValue: (value: string) => void;
}) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentShow, setCurrentShow] = useState(
    searchParams.get("show") || "all"
  );
  const [currentSort, setCurrentSort] = useState(
    searchParams.get("sort") || "newest"
  );

  const handleChange = (key: "show" | "sort", value: string) => {
    if (key === "show") {
      setCurrentShow(value);
      setSearchParams(new URLSearchParams({ show: value, sort: currentSort }));
    }
    if (key === "sort") {
      setCurrentSort(value);
      setSearchParams(new URLSearchParams({ show: currentShow, sort: value }));
    }
  };

  return (
    <div className="flex items-center w-full justify-between gap-4">
      <div className="flex items-center gap-4">
        {location.pathname === "/subscriptions" && (
          <div className="flex items-center gap-3 ">
            {SubscriptionsFiltersList.sortBy.map((sort) => (
              <button
                className={twMerge(
                  "text-white px-4 py-2 rounded-lg bg-[#333333] text-sm font-medium hover:opacity-80 transition",
                  currentSort.toLowerCase() === sort.value.toLowerCase() &&
                    "bg-white text-[#333333]"
                )}
                key={sort.value}
                onClick={() => handleChange("sort", sort.value)}
              >
                {sort.title}
              </button>
            ))}
          </div>
        )}
      </div>
      <form className="flex w-full vsm:w-auto items-center gap-2 py-1 pl-4 bg-[#1d1d1d] rounded-full">
        <Search color="#aaa" />
        <input
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Search subscriptions"
          className="placeholder:text-[#aaa] bg-inherit outline-none flex-1 pr-4 rounded-full"
        />
      </form>
    </div>
  );
};

export default SubscriptionsFilters;
