import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function StandardImageList({
  imageData,
}: {
  imageData: string[];
}) {
  console.log(imageData);

  return (
    <ImageList sx={{ maxWidth: 500 }} cols={3} rowHeight={164}>
      {imageData.map((item: string) => (
        <ImageListItem key={item}>
          <img srcSet={item} src={item} alt={item} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
