import Categories from "../components/Categories/Categories";
import VideosList from "../components/Videos/VideosList";

const Homepage = () => {
  return (
    <div className="overflow-hidden flex flex-col gap-7 w-full mb-[100px]">
      <Categories />
      <VideosList />
    </div>
  );
};

export default Homepage;
