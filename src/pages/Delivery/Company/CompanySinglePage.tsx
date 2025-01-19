import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleCompanyQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} from "../../../app/api/deliverySlice";
import UniversalDetails from "../../../components/UniversalDetails/UniversalDetails";
import Loading from "../../../components/Loading";
import ImageSlider from "../../../components/ImageSlider";

const CompanySinglePage = () => {
  const navigate = useNavigate();
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
    let res = await updateCompany({ id, data: updatedData }).unwrap();
    console.log(res, updatedData);
  };

  const deleteData = async (id: string) => {
    await deleteCompany({ id });

    navigate(-1); // Перенаправление после удаления
  };

  const fields = [
    { name: "name", label: "Название" },
    { name: "city", label: "Город" },
    { name: "country", label: "Страна" },
    { name: "phone_number", label: "Телефон" },
    { name: "full_address", label: "Адрес" },
    { name: "description", label: "Описание" },
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
    { name: "created_at", label: "Дата создания" },
    { name: "updated_at", label: "Дата обновления" },
  ];

  const renderImages = () => {
    const images = [];
    if (data?.data?.logo) images.push(data.data.logo);
    if (data?.data?.photos_sample) {
      images.push(
        ...data.data.photos_sample.map((photo: any) => photo.photo_url),
      );
    }

    return images.length ? <ImageSlider images={images} /> : null;
  };

  if (isLoading) return <Loading />;
  return (
    <>
      {renderImages()}

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
