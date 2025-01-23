import { IKContext, IKUpload } from "imagekitio-react";

const authenticator = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/videos/upload-auth`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    console.log(error);
    throw new Error(`Authentication request failed`);
  }
};

const UploadMedia = ({
  type,
  ref,
  folder,
  onSuccess,
  onUploadProgress,
  onError,
}: {
  type: "video" | "image";
  ref: React.RefObject<null | HTMLInputElement>;
  folder: string;
  onSuccess: (res: { filePath?: string; url?: string }) => void;
  onUploadProgress: (progress: { loaded: number; total: number }) => void;
  onError: (err: string) => void;
}) => {
  return (
    <IKContext
      publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        fileName={`${type}-${Date.now()}`}
        folder={`/${folder}`}
        accept={`${type}/*`}
        useUniqueFileName={true}
        onSuccess={onSuccess}
        onError={onError}
        onUploadProgress={onUploadProgress}
        className="hidden"
        ref={ref}
      />
    </IKContext>
  );
};

export default UploadMedia;
