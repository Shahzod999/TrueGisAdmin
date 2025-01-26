import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import { getValidatedUrl } from "../../app/hook/imgGetValidatedUrl";

export default function ImagesList({ imageData }: { imageData: string[] }) {
  return (
    <ImageList sx={{ maxWidth: 500 }} cols={3} rowHeight={164}>
      {imageData?.map((imageUrl, index) => (
        <ImageListItem key={index}>
          <img src={getValidatedUrl(imageUrl)} alt={imageUrl} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
