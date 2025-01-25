import { FormLabel, Typography, Button, Box } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import useUploadImage from "../../app/hook/useUploadImage";
import { useState } from "react";
import StandardImageList from "./StandardImageList";
import useSnackbar from "../../app/hook/callSnackBar";
import { useDeleteImgMutation } from "../../app/api/UploadImgSlice";
import Loading from "../Loading";

export interface imgUploadedType {
  status: string;
  image: string;
  thumbnail: string;
}

interface imgProps {
  setImageUploaded: React.Dispatch<React.SetStateAction<imgUploadedType[]>>;
  maxLenght: number;
  previewImages: string[];
  setPreviewImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const UniversalImgUploader = ({
  setImageUploaded,
  maxLenght,
  previewImages,
  setPreviewImages,
}: imgProps) => {
  const triggerSnackbar = useSnackbar();
  const { handleImageUpload, isLoading, isError, isSuccess } = useUploadImage();

  const [imageQueue, setImageQueue] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);

    if (
      imageQueue.length + filesArray.length > maxLenght ||
      previewImages.length >= maxLenght
    ) {
      triggerSnackbar(
        `Вы можете загрузить не более ${maxLenght} изображений.`,
        "error",
      );

      return;
    }

    const newBlobUrls = filesArray.map((file) => URL.createObjectURL(file));

    setPreviewImages((prev) => [...prev, ...newBlobUrls]);
    setImageQueue((prevQueue) => [...prevQueue, ...filesArray]);

    e.target.value = "";
  };

  
  const handleUploadImages = async () => {
    if (!imageQueue.length) return;

    for (const file of imageQueue) {
      try {
        const uploadedResult = (await handleImageUpload(
          file,
        )) as imgUploadedType;

        setImageUploaded((prev) => [...prev, uploadedResult]);
      } catch (error) {
        console.log(error);
      }
    }
    // Очистка очереди, т.к. мы уже загрузили эти файлы
    setImageQueue([]);
  };

  const [deleteImg, { isLoading: deleteLoading }] = useDeleteImgMutation();

  const onRemove = async (imgUrl: string) => {
    if (imgUrl.startsWith("blob:")) {
      setPreviewImages((prev) => prev.filter((item) => item !== imgUrl));

      setImageQueue((prevQueue) => {
        return prevQueue.filter((file) => {
          const localUrl = URL.createObjectURL(file);

          URL.revokeObjectURL(localUrl);
          return localUrl !== imgUrl;
        });
      });
      return;
    }

    try {
      await deleteImg({ data: { image: imgUrl } }).unwrap();

      setPreviewImages((prev) => prev.filter((item) => item !== imgUrl));

      setImageUploaded((prev) => prev.filter((item) => item.image !== imgUrl));

      triggerSnackbar("Изображение успешно удалено!", "success");
    } catch (error) {
      console.log("Ошибка при удалении изображения:", error);
      triggerSnackbar("Ошибка при удалении изображения", "error");
    }
  };

  return (
    <>
      {deleteLoading && <Loading />}
      <FormLabel sx={{ cursor: "pointer" }}>
        <Box
          sx={{
            padding: "2rem",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}>
          <Typography variant="h6">
            Добавьте Фотографию (макс. {maxLenght})
          </Typography>

          <AddPhotoAlternateIcon sx={{ fontSize: 50, cursor: "pointer" }} />

          <input
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <StandardImageList imageData={previewImages} onRemove={onRemove} />

          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUploadImages}
              disabled={isLoading || !imageQueue.length}>
              {isLoading ? "Загрузка..." : "Загрузить новые фото"}
            </Button>
          </Box>

          {isError && <Typography color="error">Ошибка загрузки</Typography>}
          {isSuccess && (
            <Typography color="success">Изображение загружено!</Typography>
          )}
        </Box>
      </FormLabel>
    </>
  );
};

export default UniversalImgUploader;
