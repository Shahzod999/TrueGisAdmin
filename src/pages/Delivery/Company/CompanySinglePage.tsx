import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleCompanyQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} from "../../../app/api/deliverySlice";
import UniversalDetails from "../../../components/UniversalDetails/UniversalDetails";
import Loading from "../../../components/Loading";
import { Box, Typography } from "@mui/material";
import UniversalImgUploader from "../../../components/UniversalImgUploader/UniversalImgUploader";

const CompanySinglePage = () => {
  const navigate = useNavigate();
  const [imageUploaded, setImageUploaded] = useState<
    {
      image: string;
      status: string;
      thumbnail: string;
    }[]
  >([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  //logo
  const [logoPrev, setLogoPrev] = useState<string[]>([]);
  const [logoUpload, setLogoUpload] = useState<
    {
      image: string;
      status: string;
      thumbnail: string;
    }[]
  >([]);
  //

  const { id } = useParams<{ id: string }>();
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
    const updatedPhotos = [
      ...data?.data?.photos_sample,
      ...imageUploaded.map((item) => ({
        photo_url_thumbnail: item.thumbnail,
        photo_url: item.image,
        photo_url_large: item.image,
      })),
    ];

    const updatedCompanyData = {
      ...updatedData,
      logo: logoUpload.length > 0 ? logoUpload[0].image : logoPrev[0] || "", // Используем существующий или новый логотип
      photos_sample: updatedPhotos, // Обновляем все фото
    };

    console.log(updatedCompanyData);
    // try {
    //   await updateCompany({
    //     id,
    //     data: updatedCompanyData,
    //   }).unwrap();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  console.log(previewImages, "prevImg");
  console.log(imageUploaded, "uploaded");

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
    { name: "requester_name", label: "Имя отправителя" },
    {
      name: "requester_phone_number",
      label: "Номер отправителя",
      type: "number",
    },
    { name: "requester_position", label: "Позиция отправителя" },
    { name: "is_partner", label: "Партнер", type: "checkbox", position: "end" },
    {
      name: "is_accept_orders",
      label: "Принимает заказы",
      type: "checkbox",
      position: "end",
    },
  ];

  const renderImages = () => {
    if (data?.data?.logo) {
      setLogoPrev([data.data.logo]);
    } else {
      setLogoPrev([]);
    }

    if (data?.data?.photos_sample) {
      setPreviewImages(
        data.data.photos_sample.map((photo: any) => photo.photo_url),
      );
    } else {
      setPreviewImages([]);
    }
  };

  useEffect(() => {
    renderImages();
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Box display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"}>
        <Box flex={1}>
          <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
            Добавьте Изображения
          </Typography>
          <UniversalImgUploader
            setImageUploaded={setImageUploaded}
            maxLenght={99}
            previewImages={previewImages}
            setPreviewImages={setPreviewImages}
          />
        </Box>

        <Box flex={1}>
          <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
            {logoPrev?.length ? "Изменить логотип" : "Добавить логотип"}
          </Typography>
          <UniversalImgUploader
            setImageUploaded={setLogoUpload}
            maxLenght={1}
            previewImages={logoPrev}
            setPreviewImages={setLogoPrev}
          />
        </Box>
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
