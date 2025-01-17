import axios from "axios";
import { VideoType } from "../types";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { useUserStore } from "../stores/useUserStore";
import { useUser } from "@clerk/clerk-react";
import {
  MoreVideos,
  VideoComments,
  VideoControls,
  VideoNotFound,
  VideoPlayer,
} from "../components/VideoPlayer";
import SubscribeButton from "../components/ui/SubscribeButton";
import { useChannelStore } from "../stores/useChannelStore";

const getVideo = async (id: string): Promise<VideoType | null> => {
  try {
    const video = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/videos/${id}`
    );

    return video.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateVideo = async (data: VideoType) => {
  try {
    return await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/videos/${data._id}`,
      {
        views: data.views + 1,
      }
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};

const VideoPage = () => {
  const { id } = useParams();
  const { getUser, user } = useUserStore();
  const { user: clerkUser } = useUser();
  const { subscribers, setSubscribers } = useChannelStore();


  
  useEffect(() => {
    const fetchUser = async () => {
      if (!clerkUser || !clerkUser.id) return;
      await getUser(clerkUser.id);
    };
    fetchUser();
  }, [clerkUser, getUser]);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["video", id],
    queryFn: () => getVideo(id!),
    staleTime: 0,
  });

  const mutation = useMutation({
    mutationFn: (data: VideoType) => updateVideo(data),
  });

  useEffect(() => {
    if (data) {
      setSubscribers(data.author.subscribers.length);
      mutation.mutate(data);
    }
  }, [data, id]);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <span>Error: {error.message}</span>;
  if (!data) return <VideoNotFound />;
  return (
    <div className="w-full h-full mt-6 flex items-start flex-col xl:flex-row gap-4  2xl:gap-8">
      {/* PLAYER */}
      <div className="w-full xl:w-4/6 2xl:w-3/4">
        {/* VIDEO */}
        <VideoPlayer url={data.videoUrl} />
        <button className="flex items-center justify-between mt-5 w-full cursor-pointer vsm:cursor-auto">
          <h3 className="font-semibold text-xl ">{data.title}</h3>
          <ChevronDown className="block vsm:hidden" color="#fff" />
        </button>
        <p className="text-[#aaa] text-xs big-text mt-4 block vsm:hidden">
          {data.description}
        </p>

        <div className="mt-5 flex  flex-wrap 2xl:flex-nowrap flex-col-reverse lg:flex-row items-start lg:items-center  gap-4 lg:gap-2">
          <div className="flex  items-center gap-2 md:gap-5 w-full justify-between vsm:w-fit vsm:justify-normal">
            <Link
              to={`/channel/${data.author.username}`}
              className="flex items-center gap-1 md:gap-4"
            >
              <img
                src={data.author.img}
                alt={data.author.username}
                width={46}
                height={46}
                className="rounded-full min-w-[46px] min-h-[46px] block bg-[#aaa]"
              />
              <div>
                <h6 className="text-lg vsm:text-sm md:text-lg font-medium">
                  {data.author.username}
                </h6>
                <p className="text-sm vsm:text-xs md:text-sm text-nowrap text-[#aaa]">
                  {subscribers} subscribers
                </p>
              </div>
            </Link>
            {user?._id !== data.author._id && (
              <SubscribeButton channelId={data.author._id} user={user} />
            )}
          </div>
          <VideoControls data={data} />
        </div>
        {/* video description */}
        <div className="mt-5 border border-[#343434] rounded-2xl py-5 px-6 w-full hidden vsm:block">
          <p>{data.description}</p>
        </div>
        {/* comments */}
        <VideoComments />
      </div>
      {/* OTHER VIDEOS */}
      <MoreVideos category={data.category} id={id!} author={data.author} />
    </div>
  );
};

export default VideoPage;
