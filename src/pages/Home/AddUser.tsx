import { useAddnewUserMutation } from "../../app/api/companySlice";

import { ErrorType } from "../../app/types/userType";
import UniversalAddForm from "../../components/UniversalAddForm/UniversalAddForm";

const AddUser = () => {
  const [addNewUser, { isLoading }] = useAddnewUserMutation();

  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      const response = await addNewUser({ data: formData }).unwrap();

      return response; // Возвращаем, чтобы UniversalAddForm обработал успех
    } catch (error: any) {
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
      title="Создать пользователя"
      fields={fields}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

export default AddUser;
