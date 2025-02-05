import { Search, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const HeaderSearch = () => {
  const params = useParams();
  const [value, setValue] = useState(params.query || "");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (value)
      navigate(`/search/${value}?${searchParams.toString() || "type=videos"}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="hidden md:flex items-center gap-3  border border-[#2a2a2a] rounded-full px-4  w-[400px] xl:w-[727px]"
    >
      <button type="button">
        <Search color="#888888" />
      </button>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name="search"
        type="text"
        placeholder="Search"
        className="block bg-inherit outline-none py-2 lg:py-3 flex-1 placeholder:text-[#888888]"
      />
      {value && (
        <button type="button" onClick={() => setValue("")}>
          <X color="#888888" />
        </button>
      )}
    </form>
  );
};

export default HeaderSearch;
