import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import CloseIcon from "@mui/icons-material/Close";
import { getValidatedUrl } from "../../app/hook/imgGetValidatedUrl";
import { IconButton } from "@mui/material";

export default function StandardImageList({
  imageData,
  onRemove,
}: {
  imageData: File[];
  onRemove: (image: string) => void;
}) {
  return (
    <ImageList sx={{ maxWidth: 500 }} cols={3} rowHeight={164}>
      {imageData?.map((file, index) => {
        if (!(file instanceof File)) return null;

        const imageUrl = URL.createObjectURL(file);
        return (
          <ImageListItem key={index}>
            <img
              srcSet={getValidatedUrl(imageUrl)}
              src={imageUrl}
              alt={file.name}
              loading="lazy"
            />
            <IconButton
              onClick={() => onRemove(file.name)}
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                },
              }}
              size="medium">
              <CloseIcon fontSize="medium" />
            </IconButton>
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}
