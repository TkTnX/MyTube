import ExploreBlock from "../components/Explore/ExploreBlock";

// TODO: Как-то передовать action в ExploreBlock, чтобы понимать, какие категории получать
// TODO: При изменении одной категории, другие не перерисовывать

const ExplorePage = () => {
  return (
    <div className="w-full vsm:h-[calc(100vh-80px)] mt-7 flex flex-col gap-7">
      <ExploreBlock action="trending" imgPath="/icons/trending.svg" title="Trending" />
      <ExploreBlock action="music" imgPath="/icons/music.svg" title="Music" />
      <ExploreBlock action="gaming" imgPath="/icons/gaming.svg" title="Gaming" />
      {/* TODO: Сделать для других категорий также (Movies, Books, News, Sport, Education, Fashion) */}
    </div>
  );
};

export default ExplorePage;
