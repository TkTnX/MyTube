import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const VideoDescription = ({
  description,
  className,
  isSmallScreen,
  videoTitle,
}: {
  description: string;
  className?: string;
  isSmallScreen: boolean;
  videoTitle?: string;
}) => {
  const [openDesc, setOpenDesc] = useState(false);

  if (isSmallScreen) {
    return (
      <div className="block vsm:hidden">
        <button
          onClick={() => setOpenDesc((prev) => !prev)}
          className="flex items-center justify-between mt-5 w-full cursor-pointer vsm:cursor-auto "
        >
          <h3 className="font-semibold text-xl big-text">{videoTitle}</h3>
          <ChevronDown
            className={twMerge(
              "block vsm:hidden transition",
              openDesc && "rotate-180"
            )}
            color="#fff"
          />
        </button>
        <p
          className={twMerge("text-[#aaa] text-xs  mt-4 ", [
            openDesc ? "block vsm:hidden" : "big-text",
          ])}
        >
          {description}
        </p>
      </div>
    );
  } else {
    return (
      <div
        className={twMerge(
          "mt-5 border border-[#343434] rounded-2xl py-5 px-6 w-full  hidden vsm:block",
          className
        )}
      >
        <p className={twMerge("", !openDesc && "big-text")}>{description}</p>
        {description.length > 200 && (
          <button
            className="text-sm text-[#aaa] hover:underline"
            onClick={() => setOpenDesc((prev) => !prev)}
          >
            {openDesc ? "hide" : "more"}
          </button>
        )}
      </div>
    );
  }
};

export default VideoDescription;
