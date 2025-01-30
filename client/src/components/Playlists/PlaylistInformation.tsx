import { Eye, Play } from "lucide-react";

const PlaylistInformation = () => {
  return (
    <div className="flex items-center gap-6 mt-6">
      <div className="flex items-center gap-1">
        <Eye size={24} color="#585858" />
        <p>
          50 <span className="text-[#aaa]">views</span>
        </p>
      </div>
      <div className="flex items-center gap-1">
        <Play fill="#585858" size={16} color="#585858" />
        <p>
          15 <span className="text-[#aaa]">videos</span>
        </p>
      </div>
    </div>
  );
}

export default PlaylistInformation