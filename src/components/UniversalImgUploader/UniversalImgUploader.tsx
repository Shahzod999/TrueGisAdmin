import { FormLabel, Typography, Box } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import StandardImageList from "./StandardImageList";
import useSnackbar from "../../app/hook/callSnackBar";

interface imgProps {
  maxLenght: number;
  imagePrev: File[];
  setImagePrev: React.Dispatch<React.SetStateAction<File[]>>;
}

const UniversalImgUploader = ({
  maxLenght,
  imagePrev,
  setImagePrev,
}: imgProps) => {
  const triggerSnackbar = useSnackbar();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);

    if (imagePrev.length >= maxLenght || filesArray.length > maxLenght) {
      triggerSnackbar(
        `Вы можете загрузить не более ${maxLenght} изображений.`,
        "error",
      );
      return;
    }

    setImagePrev((prev) => [...prev, ...filesArray]);
    e.target.value = "";
  };

  const handleRemoveImage = (imageName: string) => {
    setImagePrev((prev) => prev.filter((file) => file.name !== imageName));
  };

  return (
    <>
      <FormLabel sx={{ cursor: "pointer" }}>
        <Box
          sx={{
            padding: "1rem",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            minWidth: "300px",
          }}>
          <Typography variant="h6" fontSize={17}>
            Добавьте Фотографию (макс. {maxLenght})
          </Typography>

          <AddPhotoAlternateIcon sx={{ fontSize: 50, cursor: "pointer" }} />

          <input
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <StandardImageList
            imageData={imagePrev}
            onRemove={handleRemoveImage}
          />
        </Box>
      </FormLabel>
    </>
  );
};

export default UniversalImgUploader;
