import { Button, IconButton, ImageList, ImageListItem } from "@mui/material";
import { useEffect } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { getValidatedUrl } from "../../../app/hook/imgGetValidatedUrl";

interface LogoPhotoProps {
  dataLogoPhoto: any;
  setDataLogoPhoto: (img: string) => void;
  logo: string;
}

const LogoPhoto = ({
  dataLogoPhoto,
  setDataLogoPhoto,
  logo,
}: LogoPhotoProps) => {
  useEffect(() => {
    setDataLogoPhoto(logo || "");
  }, [logo]);

  const handleRemovePhotos = (item: string) => {
    console.log(item);
    setDataLogoPhoto("");
  };

  const handleReturn = () => {
    setDataLogoPhoto(logo);
  };
  return (
    <ImageList rowHeight={164}>
      {dataLogoPhoto && (
        <ImageListItem>
          <img
            src={getValidatedUrl(dataLogoPhoto)}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <IconButton
            onClick={() => handleRemovePhotos(dataLogoPhoto)}
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
      )}

      {dataLogoPhoto !== logo && (
        <Button onClick={handleReturn}>Отменить</Button>
      )}
    </ImageList>
  );
};

export default LogoPhoto;
