import { useSearchParams } from "react-router-dom";
import {
  searchFiltersDate,
  searchFiltersSortBy,
  searchFiltersType,
} from "../../constants";

const SearchFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (key: string, value: string) => {
    const newPrams = new URLSearchParams(searchParams);
    newPrams.set(key, value);
    setSearchParams(newPrams);
  };

  return (
    <div className="mt-6 flex items-center gap-2">
      <select
        defaultValue={searchParams.get("date") || ""}
        onChange={(e) => handleChange("date", e.target.value)}
        className="bg-[#333333] p-1 rounded-lg w-full vsm:w-auto text-xs "
      >
        <option value="" disabled selected hidden className="bg-[#111111] ">
          <span className="text-[#aaa]">Upload Date:</span> Any Time
        </option>
        {searchFiltersDate.map((option) => (
          <option value={option.value} className="bg-[#111111]">
            {option.title}
          </option>
        ))}
      </select>
      <select
        defaultValue={searchParams.get("sortBy") || ""}
        onChange={(e) => handleChange("sortBy", e.target.value)}
        className="bg-[#333333] p-1 rounded-lg w-full vsm:w-auto text-xs "
      >
        <option
          value=""
          disabled
          selected
          hidden
          className="bg-[#111111] text-[#aaa]"
        >
          <span className="text-[#aaa]">Sort by:</span> Relevance
        </option>
        {searchFiltersSortBy.map((option) => (
          <option value={option.value} className="bg-[#111111]">
            {option.title}
          </option>
        ))}
      </select>
      <select
        defaultValue={searchParams.get("type") || ""}
        onChange={(e) => handleChange("type", e.target.value)}
        className="bg-[#333333] p-1 rounded-lg w-full vsm:w-auto text-xs "
      >
        <option
          value=""
          disabled
          selected
          hidden
          className="bg-[#111111] text-[#aaa]"
        >
          <span className="text-[#aaa]">Search type:</span> Videos
        </option>
        {searchFiltersType.map((option) => (
          <option value={option.value} className="bg-[#111111]">
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilters;
