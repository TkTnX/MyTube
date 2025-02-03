import { useParams } from "react-router-dom";
import SearchFilters from "../components/Search/SearchFilters";
import SearchResults from "../components/Search/SearchResults";

const SearchPage = () => {
  const { query } = useParams();
  return (
    <div className="mt-8 w-full h-full">
      <h3 className=" text-2xl big-text-one">
        Search results for <span className="font-semibold"> {query}</span>
      </h3>
      <SearchFilters />

      {/* SEARCH RESULTS */}
      <SearchResults searchQuery={query!} />
    </div>
  );
};

export default SearchPage;
