import { Image } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import UploadMedia from "../components/ui/UploadMedia";
import { useUserStore } from "../stores/useUserStore";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { z } from "zod";
import { toast } from "react-toastify";
import { validationSchema } from "../schemas/videoValidationSchema";
import Input from "../components/ui/Input";
import UploadVideofile from "../components/CreateVideo/UploadVideofile";
import useUploadVideo from "../hooks/useUploadVideo";
import ErrorMessage from "../components/ui/ErrorMessage";
import { CategoryType } from "../types";

const CreatePage = () => {
  const [categories, setCategories] = useState<
    CategoryType[]
  >([]);
  const { getUser, user } = useUserStore();
  const { user: clerkUser } = useUser();
  const ikUploadVideoRef = useRef<null | HTMLInputElement>(null);
  const ikUploadPreviewRef = useRef<null | HTMLInputElement>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState<z.typeToFlattenedError<
    z.infer<typeof validationSchema>
  > | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/categories`
        );
        setCategories([{ _id: "", title: "None" }, ...categories.data]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (!clerkUser || !clerkUser.id) return navigate("/");
      await getUser(clerkUser.id);
    };
    fetchUser();
  }, [clerkUser, clerkUser?.id]);

  const {
    onSuccessPreview,
    onSuccessVideo,
    onError,
    onUploadProgress,
    loading,
  } = useUploadVideo({ setVideoUrl, setPreviewUrl });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const data = {
      title: formData.get("title"),
      description: formData.get("description") || "",
      previewUrl: previewUrl,
      videoUrl: videoUrl,
      category: formData.get("category"),
    };

    const result = validationSchema.safeParse(data);
    if (!result.success) return setErrors(result.error.flatten());
    if (!user) return toast.error("You must be logged in");
    const newVideo = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/videos`,
      {
        ...data,
        author: {
          _id: user._id,
        },
      }
    );
    toast.success("Video created!");
    setErrors(null);
    return navigate(`/watch/${newVideo.data._id}`);
  };

  if (loading) {
    toast.loading("Uploading...");
  } else {
    toast.dismiss();
  }

  return (
    <div className="w-full mt-10 h-full">
      <form onSubmit={handleSubmit} className="grid gap-3 ">
        <div className="flex flex-col items-center gap-4 ">
          <UploadVideofile
            ref={ikUploadVideoRef}
            errors={errors}
            loading={loading}
          />
          <UploadMedia
            onSuccess={onSuccessVideo}
            onError={onError}
            onUploadProgress={onUploadProgress}
            type="video"
            ref={ikUploadVideoRef}
            folder="videos"
          />
          <UploadMedia
            onSuccess={onSuccessPreview}
            onError={onError}
            onUploadProgress={onUploadProgress}
            type="image"
            folder="video-previews"
            ref={ikUploadPreviewRef}
          />
        </div>

        {videoUrl !== "" && (
          <>
            <Input
              errors={errors}
              className="mt-10"
              name="title"
              placeholder="Title"
              required
            />
            <Input
              errors={errors}
              name="description"
              placeholder="Description"
              className="pb-40"
            />

            <select
              name="category"
              className="bg-inherit border-white border p-4  w-full rounded-xl "
            >
              {categories.map((category: CategoryType) => (
                <option
                  className="bg-[#111111]"
                  key={category._id}
                  value={category.title.toLowerCase()}
                >
                  {category.title}
                </option>
              ))}
            </select>

            <button
              onClick={() => ikUploadPreviewRef.current!.click()}
              type="button"
              disabled={loading}
              className="flex flex-col justify-center items-center p-3 border rounded-lg border-[#2a2a2a] hover:opacity-80 transition text-sm text-[#b7b7b7] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Image />
              Upload Preview
            </button>
            <ErrorMessage error={errors?.fieldErrors?.previewUrl?.[0]} />

            <button
              type="submit"
              disabled={loading}
              className="text-lg text-black bg-white px-10 py-2 rounded-full font-medium hover:opacity-80 transition w-full sm:w-fit disabled:opacity-50 disabled:cursor-not-allowed "
            >
              Upload
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default CreatePage;
