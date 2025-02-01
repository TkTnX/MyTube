import { Calendar, Eye, Play } from "lucide-react";

type Props = {
  totalViews: number;
  totalVideos?: number;
  createdAt?: string;
  className?: string;
};

const PlaylistInformation: React.FC<Props> = ({
  totalViews,
  totalVideos,
  createdAt,
  className,
}) => {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      <div className="flex items-center gap-1">
        <Eye size={24} color="#585858" />
        <p>
          {totalViews} <span className="text-[#aaa]">views</span>
        </p>
      </div>
      {totalVideos && (
        <div className="flex items-center gap-1">
          <Play fill="#585858" size={16} color="#585858" />
          <p>
            {totalVideos} <span className="text-[#aaa]">videos</span>
          </p>
        </div>
      )}
      {createdAt && (
        <div className="flex items-center gap-1">
          <Calendar size={16} color="#585858" />
          <p>{new Date(createdAt).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default PlaylistInformation;
