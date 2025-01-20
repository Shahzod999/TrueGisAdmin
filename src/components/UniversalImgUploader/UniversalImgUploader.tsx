import { FormLabel, Typography, Button, Box } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import useUploadImage from "../../app/hook/useUploadImage";
import { useRef, useState } from "react";
import StandardImageList from "./StandardImageList";

export interface imgUploadedType {
  status: string;
  image: string;
  thumbnail: string;
}

interface imgProps {
  setImageUploaded: React.Dispatch<React.SetStateAction<string[]>>;
  maxLenght: number;
}

const UniversalImgUploader = ({ setImageUploaded, maxLenght }: imgProps) => {
  const { handleImageUpload, isLoading, isError, isSuccess } = useUploadImage();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageQueue, setImageQueue] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      if (imageQueue.length + filesArray.length > maxLenght) {
        alert(`Вы можете загрузить не более ${maxLenght} изображений.`);
        return;
      }

      const imageUrls = filesArray.map((file) => URL.createObjectURL(file));

      setPreviewImages((prev) => [...prev, ...imageUrls]);
      setImageQueue((prevQueue) => [...prevQueue, ...filesArray]);
    }
  };

  const handleUploadImages = async () => {
    for (const file of imageQueue) {
      try {
        const img = (await handleImageUpload(file)) as imgUploadedType;
        console.log(img);
        setImageUploaded((prev) => [...prev, img.image]);
      } catch (error) {
        console.log(error);
      }
    }
    setImageQueue([]);
  };

  return (
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
          ref={fileInputRef}
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <StandardImageList imageData={previewImages} />

        <Button
          variant="contained"
          color="primary"
          onClick={handleUploadImages}
          disabled={isLoading || imageQueue.length === 0}>
          {isLoading ? "Загрузка..." : "Загрузить"}
        </Button>
        {isError && <Typography color="error">Ошибка загрузки</Typography>}
        {isSuccess && (
          <Typography color="success">Изображение загружено!</Typography>
        )}
      </Box>
    </FormLabel>
  );
};

export default UniversalImgUploader;
