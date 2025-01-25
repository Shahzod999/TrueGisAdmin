import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import CloseIcon from "@mui/icons-material/Close";
import { getValidatedUrl } from "../../app/hook/imgGetValidatedUrl";
import { IconButton } from "@mui/material";

export default function StandardImageList({
  imageData,
  onRemove,
}: {
  imageData: string[];
  onRemove: (image: string) => void;
}) {

  return (
    <ImageList sx={{ maxWidth: 500 }} cols={3} rowHeight={164}>
      {imageData?.map((item: string, index) => (
        <ImageListItem key={index}>
          <img
            srcSet={getValidatedUrl(item)}
            src={item}
            alt={item}
            loading="lazy"
          />
          <IconButton
            onClick={() => onRemove(item)}
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
      ))}
    </ImageList>
  );
}
