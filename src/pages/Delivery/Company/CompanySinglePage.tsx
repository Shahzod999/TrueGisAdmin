import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleCompanyQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} from "../../../app/api/deliverySlice";
import UniversalDetails from "../../../components/UniversalDetails/UniversalDetails";
import Loading from "../../../components/Loading";
import { Box } from "@mui/material";
import UniversalImgUploader from "../../../components/UniversalImgUploader/UniversalImgUploader";

const CompanySinglePage = () => {
  const navigate = useNavigate();
  const [imageUploaded, setImageUploaded] = useState<string[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const { id } = useParams<{ id: string }>();
  // console.log(imageUploaded, "33");

  const { data, isLoading } = useGetSingleCompanyQuery({ id });
  const [updateCompany] = useUpdateCompanyMutation();
  const [deleteCompany] = useDeleteCompanyMutation();

  const fetchData = async () => {
    if (!data) throw new Error("Данные отсутствуют");
    return data?.data;
  };

  const updateOneData = async (
    id: string,
    updatedData: Record<string, any>,
  ) => {
    let res = await updateCompany({ id, data: updatedData }).unwrap();
    console.log(res, updatedData);
  };

  const deleteData = async (id: string) => {
    await deleteCompany({ id });

    navigate(-1); // Перенаправление после удаления
  };

  const fields = [
    { name: "name", label: "Название" },
    { name: "description", label: "Описание" },
    { name: "city", label: "Город" },
    { name: "country", label: "Страна" },
    { name: "phone_number", label: "Телефон" },
    { name: "full_address", label: "Адрес" },
    { name: "latitude", label: "Широта" },
    { name: "longitude", label: "Долгота" },
    { name: "rating", label: "Рейтинг" },
    { name: "review_count", label: "Количество отзывов" },
    { name: "verified", label: "Подтверждено" },
    { name: "business_status", label: "Статус бизнеса" },
    { name: "type", label: "Тип" },
    { name: "subtypes", label: "Подтипы" },
    { name: "district", label: "Район" },
    { name: "street_address", label: "Улица" },
    { name: "zipcode", label: "Почтовый индекс" },
    { name: "state", label: "Штат" },
    { name: "timezone", label: "Часовой пояс" },
    { name: "social_media.telegram", label: "Telegram" },
    { name: "social_media.instagram", label: "Instagram" },
    { name: "social_media.facebook", label: "Facebook" },
    { name: "owner_name", label: "Имя владельца" },
    { name: "owner_link", label: "Ссылка на владельца" },
    { name: "support_chat_id", label: "Чат для поддержки" },
    { name: "support_number", label: "Номер поддержки" },
    { name: "is_partner", label: "Партнер", type: "checkbox", position: "end" },
    {
      name: "is_accept_orders",
      label: "Принимает заказы",
      type: "checkbox",
      position: "end",
    },
  ];

  const renderImages = () => {
    const images = [];
    if (data?.data?.logo) images.push(data.data.logo);
    if (data?.data?.photos_sample) {
      images.push(
        ...data.data.photos_sample.map((photo: any) => photo.photo_url),
      );
    }

    return setPreviewImages(images);
    // return images.length ? <ImageSlider images={images} /> : null;
  };

  useEffect(() => {
    renderImages();
  }, [data]);

  console.log([...data?.data?.photos_sample, ...imageUploaded], "9999");

  if (isLoading) return <Loading />;
  return (
    <>
      <Box>
        {/* {renderImages()} */}
        <UniversalImgUploader
          setImageUploaded={setImageUploaded}
          maxLenght={99}
          previewImages={previewImages}
          setPreviewImages={setPreviewImages}
        />
      </Box>

      <UniversalDetails
        title="Детали компании"
        id={id || ""}
        fetchData={fetchData}
        updateData={updateOneData}
        deleteData={deleteData}
        fields={fields}
        redirectAfterDelete="/companies"
      />
    </>
  );
};

export default CompanySinglePage;
