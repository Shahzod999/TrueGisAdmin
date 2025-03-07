import { useAddNewAdminDeliveryMutation } from "../../../app/api/deliverySlice";
import UniversalAddForm from "../../../components/UniversalAddForm/UniversalAddForm";
import { ErrorType } from "../../../app/types/userType";
import { useNavigate } from "react-router";

const AddUser = () => {
  const navigate = useNavigate();
  const [addNewAdminDelivery, { isLoading }] = useAddNewAdminDeliveryMutation();

  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      const response = await addNewAdminDelivery(formData).unwrap();
      navigate("/delivery-admin");
      return response; // Возвращаем, чтобы UniversalAddForm обработал успех
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "data" in error &&
        "message" in (error as any).data
      ) {
        console.log((error as ErrorType).data.message, "error");
      } else {
        console.log("Произошла неизвестная ошибка", "error");
      }
    }
  };

  const fields = [
    { name: "full_name", label: "Полное имя", required: true },
    { name: "username", label: "Имя пользователя", required: true },
    { name: "password", label: "Пароль", type: "password", required: true },
  ];

  return (
    <UniversalAddForm
      title="Создать администратора"
      fields={fields}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

export default AddUser;
