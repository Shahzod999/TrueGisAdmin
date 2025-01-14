import {
  useDeleteUserMutation,
  useGetOneUserQuery,
  useUpdateOneUserMutation,
} from "../../../app/api/companySlice";
import { useParams } from "react-router-dom";
import UniversalDetails from "../../../components/UniversalDetails/UniversalDetails";
import { Box, CircularProgress } from "@mui/material";

const SinglePage = () => {
  const { id } = useParams<{ id: string }>();

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateOneUserMutation();
  const { data, isLoading } = useGetOneUserQuery({ id });

  const fetchData = async () => {
    return data?.data;
  };

  const updateData = async (id: string, updatedData: Record<string, any>) => {
    await updateUser({ id, body: updatedData }).unwrap();
  };

  const deleteData = async (id: string) => {
    await deleteUser({ id }).unwrap();
    window.location.href = "/users"; // Redirect after delete
  };

  const fields = [
    { name: "full_name", label: "Полное имя" },
    { name: "username", label: "Имя пользователя" },
    { name: "password", label: "Пароль", type: "password" },
  ];

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <CircularProgress />
      </Box>
    );
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
