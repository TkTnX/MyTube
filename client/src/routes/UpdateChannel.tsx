import { useUser } from "@clerk/clerk-react";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import UploadMedia from "../components/ui/UploadMedia";
import axios from "axios";
import Image from "../components/ui/Image";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { UpdateChannelSkeleton } from "../components/Skeletons";

const UpdateChannelPage = () => {
  const [coverImg, setCoverImg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const ikUploadCoverImgRef = useRef<null | HTMLInputElement>(null);
  const { loading, onError, onSuccessCoverImg, onUploadProgress } =
    useUpdateProfile({ setCoverImg });

  const { user: clerkUser } = useUser();
  const { user, getUser } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      if (!clerkUser?.id) return navigate("/");

      await getUser(clerkUser.id);
      setIsLoading(false);
    }
    fetchUser();
  }, [clerkUser, getUser, navigate]);

  if (isLoading) {
    return <UpdateChannelSkeleton />;
  }

  if ((!isLoading && !user) || !user?._id) {
    navigate("/");
    return;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);

      const data = {
        description: formData.get("description") || user.description,
        coverImg: coverImg || user.coverImg,
      };
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user.clerkId}`,
        data
      );
      toast.success("Channel updated!");
      return navigate(`/channel/${user.username}`);
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div className="w-full mt-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center md:items-start  justify-between gap-3 lg:gap-0  lg:justify-evenly"
      >
        <div className="flex flex-col gap-2 flex-1 lg:flex-none w-full lg:w-1/2">
          <UploadMedia
            folder="images"
            type="image"
            ref={ikUploadCoverImgRef}
            onSuccess={onSuccessCoverImg}
            onUploadProgress={onUploadProgress}
            onError={onError}
          />
          <button
            disabled={loading}
            type="button"
            onClick={() => ikUploadCoverImgRef.current?.click()}
            className="rounded-md w-full h-40 bg-[#1d1d1d] flex items-center justify-center hover:opacity-80 transition gap-2 relative disabled:opacity-50 disabled:pointer-events-none"
          >
            <Image
              src={user.coverImg ?? ""}
              alt={`${user.username}-cover`}
              className="absolute w-full h-full opacity-30 object-cover"
            />
            <div className="flex flex-col items-center justify-center gap-2 relative z-[2]">
              <Plus />
              <span>Cover Image</span>
            </div>
          </button>

          <textarea
            disabled={loading}
            name="description"
            className=" border-white border p-4 bg-inherit w-full rounded-xl  placeholder:text-[#b7b7b7] disabled:opacity-50 disabled:pointer-events-none"
            placeholder="Description"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#fff] text-[#1d1d1d] py-2 rounded-full hover:opacity-80 transition disabled:opacity-50 disabled:pointer-events-none"
          >
            Update profile
          </button>
          <p className="text-xs text-[#aaa]">
            You can change avatar, username and email using avatar button on the
            header
          </p>
        </div>
      </form>
      <Link
        className="mt-4 w-fit mx-auto border p-2 rounded-full flex   hover:opacity-80 transition"
        to={`/channel/${user.username}`}
      >
        Visit your channel
      </Link>
    </div>
  );
};

export default UpdateChannelPage;
