import { Image, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import UploadMedia from "../components/ui/UploadMedia";
import { useUserStore } from "../stores/useUserStore";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { z } from "zod";
import { toast } from "react-toastify";

// TODO: Рефакторинг кода

const validationSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().max(1000).optional(),
  category: z.string().min(2).max(100),
  videoUrl: z.string().url(),
  previewUrl: z.string().min(3),
});

const CreatePage = () => {
  const { getUser, user } = useUserStore();
  const { user: clerkUser } = useUser();
  const ikUploadVideoRef = useRef<null | HTMLInputElement>(null);
  const ikUploadPreviewRef = useRef<null | HTMLInputElement>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<z.typeToFlattenedError<
    z.infer<typeof validationSchema>
  > | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!clerkUser || !clerkUser.id) return navigate("/");
      await getUser(clerkUser.id);
    };
    fetchUser();
  }, [clerkUser, clerkUser?.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      previewUrl: previewUrl,
      videoUrl: videoUrl,
      category: formData.get("category"),
    };
    const result = validationSchema.safeParse(data);
    if (!result.success) {
      const errorData = result.error.flatten();
      setErrors(errorData);
      console.log(errorData);
      return toast.error("Please fill in all the fields");
    }

    if (!user) return toast.error("You must be logged in");
    const newVideo = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/videos`,
      {
        ...data,
        author: {
          _id: user._id,
          username: user.username,
          img: user.img,
          subscribers: user.subscribers,
        },
      }
    );
    toast.success("Video created!");
    setErrors(null);
    return navigate(`/watch/${newVideo.data._id}`);
  };

  const onError = (err: string) => {
    console.log("Error", err);
    toast.error(`Something went wrong: ${err}`);
  };

  const onSuccessVideo = (res: { url?: string }) => {
    console.log("SUccess!", res);
    setVideoUrl(res.url!);
    setLoading(false);
    toast.success("Video file uploaded!");
  };
  const onSuccessPreview = (res: { filePath?: string }) => {
    console.log("SUccess!", res);
    setPreviewUrl(res.filePath!);
    setLoading(false);
    toast.success("Preview file uploaded!");
  };

  const onUploadProgress = (progress: { loaded: number; total: number }) => {
    setLoading(true);
    console.log(progress);
    toast.loading("Uploading...");
    if (progress.loaded === progress.total) {
      setLoading(false);
      toast.dismiss();
    }
  };

  return (
    <div className="w-full mt-10">
      <form onSubmit={handleSubmit} className="grid gap-3 ">
        <div className="flex flex-col items-center gap-4 ">
          <input accept="video/*" name="videoUrl" hidden type="file" />

          <button
            disabled={loading}
            onClick={() => ikUploadVideoRef.current!.click()}
            type="button"
            className="bg-[#1f1f1f] p-8 rounded-full hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload color="#909090" size={80} />
          </button>

          <p className="text-lg">
            Drag and drop the files here or click the button below to select
            them on your computer.
          </p>

          <button
            disabled={loading}
            onClick={() => ikUploadVideoRef.current!.click()}
            type="button"
            className="text-lg text-black bg-white px-4 py-2 rounded-full font-medium hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Select Files
          </button>
          {errors?.fieldErrors?.videoUrl && (
            <p className="text-red-500">{errors?.fieldErrors?.videoUrl[0]}</p>
          )}
          <UploadMedia
            onSuccess={onSuccessVideo}
            onError={onError}
            onUploadProgress={onUploadProgress}
            type="videos"
            ref={ikUploadVideoRef}
          />
          <UploadMedia
            onSuccess={onSuccessPreview}
            onError={onError}
            onUploadProgress={onUploadProgress}
            type="video-previews"
            ref={ikUploadPreviewRef}
          />
        </div>
        <input
          name="title"
          type="text"
          placeholder="Title (required)"
          required
          className="border-white border p-4 bg-inherit w-full rounded-xl mt-10 placeholder:text-[#b7b7b7]"
        />
        {errors?.fieldErrors?.title && (
          <p className="text-red-500">{errors?.fieldErrors?.title[0]}</p>
        )}
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border-white border p-4 bg-inherit rounded-xl placeholder:text-[#b7b7b7]"
        />
        {errors?.fieldErrors?.description && (
          <p className="text-red-500">{errors?.fieldErrors?.description[0]}</p>
        )}
        <input
          name="category"
          type="text"
          placeholder="Category (required)"
          required
          className="border-white border p-4 bg-inherit w-full rounded-xl placeholder:text-[#b7b7b7]"
        />
        {errors?.fieldErrors?.category && (
          <p className="text-red-500">{errors?.fieldErrors?.category[0]}</p>
        )}

        <button
          onClick={() => ikUploadPreviewRef.current!.click()}
          type="button"
          disabled={loading}
          className="flex flex-col justify-center items-center p-3 border rounded-lg border-[#2a2a2a] hover:opacity-80 transition text-sm text-[#b7b7b7] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Image />
          Upload Preview
        </button>
        {errors?.fieldErrors?.previewUrl && (
          <p className="text-red-500">{errors?.fieldErrors?.previewUrl[0]}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="text-lg text-black bg-white px-10 py-2 rounded-full font-medium hover:opacity-80 transition w-fit disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Upload{" "}
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
