import ExploreBlock from "../components/Explore/ExploreBlock";

const ExplorePage = () => {
  return (
    <div className="w-full vsm:h-[calc(100vh-80px)] mt-7">
      <ExploreBlock imgPath="/icons/trending.svg" title="Trending" />
    </div>
  );
};

export default ExplorePage;
