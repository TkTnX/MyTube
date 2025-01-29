import ExploreBlock from "../components/Explore/ExploreBlock";

// TODO: Пофиксить вёрстку сайдбара
// TODO: При создании видео выбор ТОЛЬКО определённых категорий

const ExplorePage = () => {
  return (
    <div className="w-full vsm:h-[calc(100vh-80px)] mt-7 flex flex-col gap-7">
      <ExploreBlock
        action="trending"
        imgPath="/icons/trending.svg"
        title="Trending"
      />
      <ExploreBlock action="music" imgPath="/icons/music.svg" title="Music" />
      <ExploreBlock
        action="gaming"
        imgPath="/icons/gaming.svg"
        title="Gaming"
      />
      {/* TODO: Сделать для других категорий также (Movies, Books, News, Sport, Education, Fashion) */}
    </div>
  );
};

export default ExplorePage;
