import { useState } from "react";
import { toast } from "react-toastify";

type UploadVideoProps = {
  setVideoUrl: React.Dispatch<React.SetStateAction<string>>;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string>>;
};

const useUploadVideo = ({ setVideoUrl, setPreviewUrl }: UploadVideoProps) => {
  const [loading, setLoading] = useState(false);

  const onError = (err: string) => {
    console.log("Error", err);
    toast.error(`Something went wrong: ${err}`);
  };

  const onSuccessVideo = (res: { url?: string }) => {
    setVideoUrl(res.url!);
    setLoading(false);
    toast.success("Video file uploaded!");
  };
  const onSuccessPreview = (res: { filePath?: string }) => {
    setPreviewUrl(res.filePath!);
    setLoading(false);
    toast.success("Preview file uploaded!");
  };

  const onUploadProgress = (progress: { loaded: number; total: number }) => {
    setLoading(true);
    if (progress.loaded === progress.total) {
      setLoading(false);
    }
  };
  return {
    onError,
    onSuccessVideo,
    onSuccessPreview,
    onUploadProgress,
    loading,
  };
};

export default useUploadVideo;
