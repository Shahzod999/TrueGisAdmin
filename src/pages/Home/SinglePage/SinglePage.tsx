import {
  useDeleteUserMutation,
  useGetOneUserQuery,
  useUpdateOneUserMutation,
} from "../../../app/api/companySlice";
import { useNavigate, useParams } from "react-router-dom";
import UniversalDetails from "../../../components/UniversalDetails/UniversalDetails";

import Loading from "../../../components/Loading";

const SinglePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateOneUserMutation();
  const { data, isLoading } = useGetOneUserQuery({ id });

  const fetchData = async () => {
    if (!data) {
      throw new Error("Данные еще не загружены");
    }
    return data?.data;
  };

  const updateData = async (id: string, updatedData: Record<string, any>) => {
    await updateUser({ id, body: updatedData }).unwrap();
  };

  const deleteData = async (id: string) => {
    await deleteUser({ id }).unwrap();
    navigate(-1); // Redirect after delete
  };

  const fields = [
    { name: "full_name", label: "Полное имя" },
    { name: "username", label: "Имя пользователя" },
    { name: "password", label: "Пароль", type: "password" },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <UniversalDetails
      title="Редактировать пользователя"
      id={id || ""}
      fetchData={fetchData}
      updateData={updateData}
      deleteData={deleteData}
      fields={fields}
      redirectAfterDelete="/users"
    />
  );
};

export default SinglePage;
