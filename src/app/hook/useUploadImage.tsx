import { useUploadImgMutation } from "../api/UploadImgSlice";

const useUploadImage = () => {
  const [uploadImg, { isLoading, isError, isSuccess, data, error }] =
    useUploadImgMutation();

  const handleImagesUpload = async (files: File[]) => {
    return new Promise(async (resolve, reject) => {
      if (!files || files.length === 0) {
        reject("NO file provided");
        return;
      }

      const uploadedImages: string[] = [];
      let hasError = false;

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("page", "truegis");

        try {
          const res = await uploadImg({ formData }).unwrap();
          if (res) {
            uploadedImages.push(res);
          } else {
            hasError = true;
            reject(`No URL returned for file: ${file.name}`);
            break;
          }
        } catch (error) {
          hasError = true;
          reject("Image upload failed");
          break;
        }
      }

      if (!hasError) {
        resolve(uploadedImages);
      }
    });
  };

  return {
    handleImagesUpload,
    isLoading,
    isError,
    isSuccess,
    error,
    data,
  };
};

export default useUploadImage;
