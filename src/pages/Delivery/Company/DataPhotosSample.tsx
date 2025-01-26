import { Button, IconButton, ImageList, ImageListItem } from "@mui/material";
import { useEffect } from "react";
import { PhotosSample } from "../../../app/types/companyType";
import CloseIcon from "@mui/icons-material/Close";
import { getValidatedUrl } from "../../../app/hook/imgGetValidatedUrl";

interface DataPhotosSampleProps {
  dataPhotosSample: any;
  setDataPhotosSample: any;
  photoSample: any;
}

const DataPhotosSample = ({
  dataPhotosSample,
  setDataPhotosSample,
  photoSample,
}: DataPhotosSampleProps) => {
  useEffect(() => {
    setDataPhotosSample(photoSample || []);
  }, [photoSample]);

  const handleRemovePhotos = (item: PhotosSample) => {
    setDataPhotosSample((prev: PhotosSample[]) =>
      prev.filter(
        (dataItem: PhotosSample) => dataItem.photo_url !== item.photo_url,
      ),
    );
  };

  const handleReturn = () => {
    setDataPhotosSample(photoSample);
  };
  return (
    <ImageList cols={3} rowHeight={164}>
      {dataPhotosSample?.map((item: PhotosSample) => (
        <ImageListItem key={item.photo_url}>
          <img
            src={getValidatedUrl(item.photo_url)}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <IconButton
            onClick={() => handleRemovePhotos(item)}
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
      {dataPhotosSample.length !== photoSample.length && (
        <Button onClick={handleReturn}>Отменить</Button>
      )}
    </ImageList>
  );
};

export default DataPhotosSample;
