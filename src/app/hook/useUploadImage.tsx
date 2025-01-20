import { useUploadImgMutation } from "../api/UploadImgSlice";

const useUploadImage = () => {
  const [uploadImg, { isLoading, isError, isSuccess, data, error }] =
    useUploadImgMutation();

  const handleImageUpload = async (file: File) => {
    return new Promise(async (resolve, reject) => {
      if (!file) {
        reject("NO file provided");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("page", "truegis");
      
      try {
        const res = await uploadImg({ formData }).unwrap();
        if (res) {
          resolve(res);
        } else {
          reject("No Url returned from server");
        }
      } catch (error) {
        reject("Image upload failed");
      }
    });
  };

  return {
    handleImageUpload,
    isLoading,
    isError,
    isSuccess,
    error,
    data,
  };
};

export default useUploadImage;
