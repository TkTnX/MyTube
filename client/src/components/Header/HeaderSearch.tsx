import { Search } from "lucide-react";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const HeaderSearch = () => {
  const navigate = useNavigate();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const value = formData.get("search");

    if (value) navigate(`/search/${value}?type=videos`);
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
        name="search"
        type="text"
        placeholder="Search"
        className="block bg-inherit outline-none py-2 lg:py-3 flex-1 placeholder:text-[#888888]"
      />
    </form>
  );
};

export default HeaderSearch;
