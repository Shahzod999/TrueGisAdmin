import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  // Удаляем возможные дубликаты
  const uniqueImages = Array.from(new Set(images));

  if (!uniqueImages || uniqueImages.length === 0) {
    return <p>Изображения отсутствуют</p>;
  }

  const settings = {
    dots: true,
    infinite: false, // Отключаем бесконечный цикл
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const getFullImageUrl = (image: string): string => {
    return image.startsWith("http") ? image : `https://dev.admin13.uz${image}`;
  };

  return (
    <div style={{ maxWidth: "200px", margin: "0 auto" }}>
      <Slider {...settings}>
        {uniqueImages.map((image, index) => (
          <div key={index}>
            <img
              src={getFullImageUrl(image)}
              alt={`Image ${index + 1}`}
              style={{
                width: "100%",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
