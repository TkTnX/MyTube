import { Eye, Play } from "lucide-react";

type Props = {
  totalViews: number;
  totalVideos: number;
};

const PlaylistInformation: React.FC<Props> = ({ totalViews, totalVideos }) => {
  return (
    <div className="flex items-center gap-6 mt-6">
      <div className="flex items-center gap-1">
        <Eye size={24} color="#585858" />
        <p>
          {totalViews} <span className="text-[#aaa]">views</span>
        </p>
      </div>
      <div className="flex items-center gap-1">
        <Play fill="#585858" size={16} color="#585858" />
        <p>
          {totalVideos} <span className="text-[#aaa]">videos</span>
        </p>
      </div>
    </div>
  );
};

export default PlaylistInformation;
