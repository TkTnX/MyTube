import { useSearchParams } from "react-router-dom";
import { FILTERS_MAP, searchFiltersType } from "../../constants";

const SearchFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = (searchParams.get("type") || "") as keyof typeof FILTERS_MAP;
  const handleChange = (key: string, value: string) => {
    if (key === "type") {
      setSearchParams(new URLSearchParams({ type: value }));
    } else {
      const newPrams = new URLSearchParams(searchParams);
      newPrams.set(key, value);
      setSearchParams(newPrams);
    }
  };

  return (
    <div className="mt-6 flex items-center gap-2">
      {FILTERS_MAP[type]?.map(
        ({
          key,
          options,
        }: {
          key: string;
          options: { value: string; title: string }[];
        }) => (
          <select
            key={key}
            defaultValue={searchParams.get(key) || ""}
            onChange={(e) => handleChange(key, e.target.value)}
            className="bg-[#333333] p-1 rounded-lg w-full vsm:w-auto text-xs "
          >
            {options.map((option: { value: string; title: string }) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-[#111111]"
              >
                {option.title}
              </option>
            ))}
          </select>
        )
      )}
      <select
        defaultValue={type}
        onChange={(e) => handleChange("type", e.target.value)}
        className="bg-[#333333] p-1 rounded-lg w-full vsm:w-auto text-xs "
      >
        <option value="" disabled hidden className="bg-[#111111] text-[#aaa]">
          <span className="text-[#aaa]">Search type:</span> Videos
        </option>
        {searchFiltersType.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-[#111111]"
          >
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilters;
