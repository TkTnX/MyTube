import { Search } from "lucide-react";

const HeaderSearch = () => {
  return (
    <form className="hidden md:flex items-center gap-3  border border-[#2a2a2a] rounded-full px-4  w-[400px] xl:w-[727px]">
      <button type="button">
        <Search color="#888888" />
      </button>
      <input
        type="text"
        placeholder="Search"
        className="block bg-transparent outline-none py-2 lg:py-3 flex-1 placeholder:text-[#888888]"
      />
    </form>
  );
};

export default HeaderSearch;
