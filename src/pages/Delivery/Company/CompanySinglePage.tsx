import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleCompanyQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} from "../../../app/api/deliverySlice";
import UniversalDetails from "../../../components/UniversalDetails/UniversalDetails";
import Loading from "../../../components/Loading";
import { Box, Button, Typography } from "@mui/material";
import UniversalImgUploader from "../../../components/UniversalImgUploader/UniversalImgUploader";
import useUploadImage from "../../../app/hook/useUploadImage";
import {
  imgUploadedType,
  PhotosSample,
  WorkingHours,
} from "../../../app/types/companyType";
import DataPhotosSample from "./DataPhotosSample";
import LogoPhoto from "./LogoPhoto";
import TimePicker from "../../../components/TimePicker";
import BusinessSettingsForm, { FieldConfig } from "./ChekBox";

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
];

const fieldsSetting: FieldConfig[] = [
  { name: "is_partner", label: "Партнер", type: "switch" },
  { name: "is_accept_orders", label: "Принимает заказы", type: "switch" },
  { name: "has_menu", label: "Есть Меню", type: "switch" },
  {
    name: "order_type",
    label: "Тип заказа",
    type: "select",
    options: [
      { value: "delivery_pickup", label: "Самовывоз/Доставка" },
      { value: "appointment", label: "По записи" },
    ],
  },
];

const CompanySinglePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isFetching } = useGetSingleCompanyQuery({ id });
  const [updateCompany] = useUpdateCompanyMutation();
  const [deleteCompany] = useDeleteCompanyMutation();

  const { handleImagesUpload, isLoading: loadingUploadImg } = useUploadImage();

  const [dataPhotosSample, setDataPhotosSample] = useState<PhotosSample[]>([]);
  const [dataLogoPhoto, setDataLogoPhoto] = useState<string>("");

  const [imagePrev, setImagePrev] = useState<File[]>([]);
  const [logoPrev, setLogoPrev] = useState<File[]>([]);
  const [workingHours, setWorkingHours] = useState(
    data?.data?.working_hours || {},
  );
  const [settings, setSettings] = useState({
    is_partner: false,
    is_accept_orders: false,
    has_menu: false,
    order_type: "",
  });

  // woringHours
  useEffect(() => {
    if (data?.data?.working_hours) {
      setWorkingHours(data.data.working_hours);
    }

    if (data?.data) {
      setSettings({
        is_partner: data.data.is_partner ?? false,
        is_accept_orders: data.data.is_accept_orders ?? false,
        order_type: data.data.order_type ?? "delivery_pickup",
        has_menu: data.data.has_menu ?? false,
      });
    }
  }, [data]);

  const updateOneData = async (
    id: string,
    updatedData: Record<string, any>,
  ) => {
    let uploadedUrls: any = [];

    if (imagePrev.length > 0) {
      try {
        uploadedUrls = await handleImagesUpload(imagePrev);
        console.log("Uploaded images:", uploadedUrls);
      } catch (error) {
        console.error("Upload photos_sample error:", error);
      }
    }

    let newlogo: any = [];
    if (logoPrev.length > 0) {
      try {
        newlogo = await handleImagesUpload(logoPrev);
        console.log("Uploaded Logo:", newlogo);
      } catch (error) {
        console.error("Upload logo error:", error);
      }
    }

    const updatedCompanyData = {
      ...data?.data,
      ...updatedData,
      ...settings,
      working_hours: { ...workingHours },
      photos_sample: [
        ...(dataPhotosSample || []), // Существующие фото, если есть
        ...uploadedUrls.map((item: imgUploadedType) => ({
          photo_url_thumbnail: item.thumbnail,
          photo_url: item.image,
          photo_url_large: item.image,
        })),
      ],
      logo: newlogo?.[0]?.image || dataLogoPhoto || "",
    };

    console.log(updatedCompanyData);

    try {
      let res = await updateCompany({
        id,
        data: updatedCompanyData,
      }).unwrap();
      console.log(res, " werwer");

      setImagePrev([]);
      setLogoPrev([]);
    } catch (error) {
      throw new Error("Ошибка обновления данных");
    }
  };

  const deleteData = async (id: string) => {
    await deleteCompany({ id });
    navigate(-1);
  };
  console.log(data);

  const handleWorkingHoursChange = (newHours: WorkingHours) => {
    setWorkingHours(newHours);
  };

  const handleChangeSettings = (name: string, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {(loadingUploadImg || isFetching) && <Loading />}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        p={2}
        gap={3}
        flexWrap={"wrap"}>
        <Box flex={1}>
          <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
            Логотип
          </Typography>
          <UniversalImgUploader
            maxLenght={1}
            imagePrev={logoPrev}
            setImagePrev={setLogoPrev}
          />
          <LogoPhoto
            dataLogoPhoto={dataLogoPhoto}
            setDataLogoPhoto={setDataLogoPhoto}
            logo={data?.data?.logo}
          />
        </Box>

        <Box flex={1}>
          <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
            Изображения
          </Typography>
          <UniversalImgUploader
            maxLenght={99}
            imagePrev={imagePrev}
            setImagePrev={setImagePrev}
          />

          <DataPhotosSample
            dataPhotosSample={dataPhotosSample}
            setDataPhotosSample={setDataPhotosSample}
            photoSample={data?.data?.photos_sample}
          />
        </Box>
      </Box>
      <Box p={2} gap={3} flexWrap={"wrap"}>
        <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
          Дополнительно
        </Typography>

        <Box display={"flex"} gap={3}>
          <TimePicker
            workingHours={workingHours}
            setWorkingHours={handleWorkingHoursChange}
          />

          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate(`/delivery-products/${data?.data?._id}`)}
            size="small">
            Продукты компании
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate(`/delivery-orders/${data?.data?._id}`)}
            size="small">
            Заказы компании
          </Button>
        </Box>
      </Box>
      <UniversalDetails
        title="Детали компании"
        id={id || ""}
        fetchData={() => data?.data}
        updateData={updateOneData}
        deleteData={deleteData}
        fields={fields}
        redirectAfterDelete="/companies"
      />
      <BusinessSettingsForm
        values={settings}
        onChange={handleChangeSettings}
        fields={fieldsSetting}
      />
      ;
    </>
  );
};

export default CompanySinglePage;
