import { useNavigate, useParams } from "react-router-dom";
import {
  useGetOneCommentQuery,
  useUpdateOneCommentMutation,
  useDeleteOneCommentMutation,
} from "../../../app/api/deliverySlice";
import UniversalDetails from "../../../components/UniversalDetails/UniversalDetails";
import Loading from "../../../components/Loading";
import ImageSlider from "../../../components/ImageSlider";
import BusinessSettingsForm, { FieldConfig } from "../Company/ChekBox";
import { useEffect, useState } from "react";

const fields = [
  { name: "user.telegram_name", label: "Имя пользователя" },
  { name: "user.telegram_username", label: "Телеграм Имя" },
  { name: "rating", label: "Рейтинг" },
  { name: "message", label: "Сообщение", type: "textarea" },
  { name: "created_at", label: "Дата создания" },
  { name: "company.name", label: "Название компании" },
  { name: "company.full_address", label: "Адрес компании" },
];

const fieldsSetting: FieldConfig[] = [
  {
    name: "status",
    label: "Статус",
    type: "select",
    options: [
      { value: "accepted", label: "Принять" },
      { value: "rejected", label: "Отклонить" },
      { value: "pending", label: "Ожидание" },
    ],
  },
];

const CommentSinglePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetOneCommentQuery({ id });

  const [updateOneComment] = useUpdateOneCommentMutation();
  const [deleteOneComment] = useDeleteOneCommentMutation();
  const [settings, setSettings] = useState({
    status: "pending",
  });

  useEffect(() => {
    setSettings({
      status: data?.data?.status,
    });
  }, [data]);

  const fetchData = async () => {
    if (!data) throw new Error("Данные отсутствуют");

    // Форматирование даты и добавление подстраховки для отсутствующих данных
    return {
      ...data.data,
      created_at: new Date(data.data.created_at).toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const updateData = async (id: string, updatedData: Record<string, any>) => {
    // console.log({ id, data: { ...updatedData, ...settings } });

    let res = await updateOneComment({
      id,
      data: { ...updatedData, ...settings },
    }).unwrap();
    console.log(res);
  };

  const deleteData = async (id: string) => {
    let res = await deleteOneComment({ id });
    console.log(res);
    navigate(-1);
  };

  const renderImages = (images: string[] | undefined) => {
    if (!images || images.length === 0) return null;
    return (
      <div style={{ margin: "20px 0" }}>
        <ImageSlider images={images} />
      </div>
    );
  };

  const handleChangeSettings = (name: string, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {renderImages(data?.data.thumbnails)}
      <UniversalDetails
        title="Детали комментария"
        id={id || ""}
        fetchData={fetchData}
        updateData={updateData}
        deleteData={deleteData}
        fields={fields}
        redirectAfterDelete="/delivery-comments"
      />
      <BusinessSettingsForm
        values={settings}
        onChange={handleChangeSettings}
        fields={fieldsSetting}
      />
    </>
  );
};

export default CommentSinglePage;
