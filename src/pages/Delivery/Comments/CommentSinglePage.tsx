import { useNavigate, useParams } from "react-router-dom";
import {
  useGetOneCommentQuery,
  useUpdateOneCommentMutation,
  useDeleteOneCommentMutation,
} from "../../../app/api/deliverySlice";
import UniversalDetails from "../../../components/UniversalDetails/UniversalDetails";
import Loading from "../../../components/Loading";
import ImageSlider from "../../../components/ImageSlider";

const CommentSinglePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetOneCommentQuery({ id });


  const [updateOneComment] = useUpdateOneCommentMutation();
  const [deleteOneComment] = useDeleteOneCommentMutation();

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
    let res = await updateOneComment({ id, data: updatedData }).unwrap();
    console.log(res);
  };

  const deleteData = async (id: string) => {
    let res = await deleteOneComment({ id });
    console.log(res);
    navigate(-1);
  };

  const fields = [
    { name: "user.telegram_name", label: "Имя пользователя" },
    { name: "user.telegram_username", label: "Телеграм Имя" },
    { name: "rating", label: "Рейтинг" },
    { name: "message", label: "Сообщение", type: "textarea" },
    { name: "created_at", label: "Дата создания" },
    { name: "status", label: "Статус" },
    { name: "company.name", label: "Название компании" },
    { name: "company.full_address", label: "Адрес компании" },
  ];

  const renderImages = (images: string[] | undefined) => {
    if (!images || images.length === 0) return null;
    return (
      <div style={{ margin: "20px 0" }}>
        <ImageSlider images={images} />
      </div>
    );
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
    </>
  );
};

export default CommentSinglePage;
