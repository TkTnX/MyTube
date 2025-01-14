import { Image, Upload } from "lucide-react";
import { useRef, useState } from "react";
import UploadMedia from "../components/ui/UploadMedia";

const CreatePage = () => {
  const ikUploadVideoRef = useRef<null | HTMLInputElement>(null);
  const ikUploadPreviewRef = useRef<null | HTMLInputElement>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      previewUrl: previewUrl,
      videoUrl: videoUrl,
      category: formData.get("category"),
    };
      console.log(data);
    //   TODO: Создание видео
  };

  const onError = (err: string) => {
    console.log("Error", err);
    //   todo: add toaster
  };

  const onSuccessVideo = (res: { filePath: string }) => {
    console.log("SUccess!", res);
    setVideoUrl(res.filePath);
    setLoading(false);
  };
  const onSuccessPreview = (res: { filePath: string }) => {
    console.log("SUccess!", res);
    setPreviewUrl(res.filePath);
    setLoading(false);
  };

  const onUploadProgress = (progress: { loaded: number; total: number }) => {
    setLoading(true);
    console.log(progress);
    if (progress.loaded === progress.total) {
      setLoading(false);
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
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border-white border p-4 bg-inherit rounded-xl placeholder:text-[#b7b7b7]"
        />
        <input
          name="category"
          type="text"
          placeholder="Category (required)"
          required
          className="border-white border p-4 bg-inherit w-full rounded-xl placeholder:text-[#b7b7b7]"
        />

        <button
          onClick={() => ikUploadPreviewRef.current!.click()}
          type="button"
          disabled={loading}
          className="flex flex-col justify-center items-center p-3 border rounded-lg border-[#2a2a2a] hover:opacity-80 transition text-sm text-[#b7b7b7] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Image />
          Upload Preview
        </button>
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
