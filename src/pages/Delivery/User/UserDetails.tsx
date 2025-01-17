import UniversalDetails from "../../../components/UniversalDetails/UniversalDetails";
import {
  useDeleteDeliveryUserMutation,
  useGetDeliveryUserQuery,
  useUpdateDeliveryUserMutation,
} from "../../../app/api/deliverySlice";
import { useParams } from "react-router";

type UserData = {
  _id: string;
  full_name: string;
  phone: string;
  can_order: boolean;
  is_admin: boolean;
  is_blocked: boolean;
};

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: userData } = useGetDeliveryUserQuery(id);
  const [updateUser] = useUpdateDeliveryUserMutation();
  const [deleteUser] = useDeleteDeliveryUserMutation();

  const handleUpdate = async (id: string, data: Partial<UserData>) => {
    await updateUser({ id, data }).unwrap();
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id).unwrap();
  };

  const fields = [
    { name: "full_name", label: "ФИО", required: true },
    { name: "phone", label: "Телефон", required: true },
    { name: "can_order", label: "Может заказывать", type: "checkbox" },
    { name: "is_admin", label: "Администратор", type: "checkbox" },
    { name: "is_blocked", label: "Заблокирован", type: "checkbox" },
  ];

  return (
    <UniversalDetails
      title="Детали пользователя"
      id={id || ""}
      fetchData={() => Promise.resolve(userData)}
      updateData={handleUpdate}
      deleteData={handleDelete}
      fields={fields}
      redirectAfterDelete="/users" // Update with actual redirect path
    />
  );
};

export default UserDetails;
