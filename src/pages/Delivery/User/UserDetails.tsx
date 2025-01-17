import { useParams } from "react-router";
import {
  useDeleteDeliveryUserMutation,
  useGetDeliveryUserQuery,
  useUpdateDeliveryUserMutation,
} from "../../../app/api/deliverySlice";
import ImageSlider from "../../../components/ImageSlider";
import Loading from "../../../components/Loading";
import UniversalDetails from "../../../components/UniversalDetails/UniversalDetails";

type UserData = {
  _id: string;
  full_name: string;
  phone: string;
  can_order: boolean;
  is_admin: boolean;
  is_blocked: boolean;
  telegram_name: string;
  telegram_username: string;
  telegram_profile_photo: {
    image: string | null;
    thumbnail: string | null;
  };
  created_at: string;
  updated_at?: string;
};

const UserDetails = () => {
  const { id } = useParams();
  const { data: userData, isLoading } = useGetDeliveryUserQuery(id);
  console.log(userData);

  const [updateUser] = useUpdateDeliveryUserMutation();
  const [deleteUser] = useDeleteDeliveryUserMutation();

  const handleUpdate = async (id: string, data: Partial<UserData>) => {
    let res = await updateUser({ id, data }).unwrap();
    console.log(res, data);
    
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id).unwrap();
  };

  const fetchData = async () => {
    if (!userData) throw new Error("Данные отсутствуют");
    return userData?.data;
  };

  const fields = [
    { name: "full_name", label: "ФИО", required: true },
    { name: "phone", label: "Телефон", required: true },
    { name: "can_order", label: "Может заказывать", type: "checkbox" },
    { name: "is_admin", label: "Администратор", type: "checkbox" },
    { name: "is_blocked", label: "Заблокирован", type: "checkbox" },
    { name: "telegram_name", label: "Телеграм Имя" },
    { name: "telegram_username", label: "Телеграм Username" },
    { name: "created_at", label: "Дата создания" },
  ];

  if (isLoading) return <Loading />;

  const renderProfilePhoto = (photo: string | null) => {
    if (!photo) return null;
    return (
      <div style={{ margin: "20px 0" }}>
        <ImageSlider images={[photo]} />
      </div>
    );
  };

  return (
    <>
      {renderProfilePhoto(
        userData?.data?.telegram_profile_photo?.image || null,
      )}
      <UniversalDetails
        title="Детали пользователя"
        id={id || ""}
        fetchData={fetchData}
        updateData={handleUpdate}
        deleteData={handleDelete}
        fields={fields}
        redirectAfterDelete="/users" // Update with actual redirect path
      />
    </>
  );
};

export default UserDetails;
