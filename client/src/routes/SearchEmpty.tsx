import HeaderSearch from "../components/Header/HeaderSearch";

const SearchEmptyPage = () => {
  return (
    <div className=" w-full mt-10 items-center justify-center flex ">
      <div className="flex flex-col gap-10">
        <HeaderSearch isMobile />
        <div className="text-center text-lg font-semibold">
          Start searching...
        </div>
      </div>
    </div>
  );
};

export default SearchEmptyPage;
