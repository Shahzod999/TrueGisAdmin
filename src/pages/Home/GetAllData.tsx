import {
  useGetAllUserQuery,
  useDeleteUserMutation,
} from "../../app/api/companySlice";
import { useNavigate } from "react-router";
import useSnackbar from "../../app/hook/callSnackBar";
import UniversalTable from "../../components/UniversalTable/UniversalTable";
import { userTypeData } from "../../app/types/userType";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const GetAllData = () => {
  const navigate = useNavigate();
  const triggerSnackbar = useSnackbar();
  const [deleteUser] = useDeleteUserMutation();
  const { data, isLoading, isError, error } = useGetAllUserQuery({});

  const handleDelete = async (id: string) => {
    try {
      await deleteUser({ id }).unwrap();
      triggerSnackbar("Пользователь успешно удален", "success");
    } catch (error) {
      triggerSnackbar("Произошла ошибка при удалении", "error");
    }
  };

  const handleView = (id: string) => {
    navigate(id);
  };

  const columns = [
    { field: "_id", headerName: "ID" },
    { field: "full_name", headerName: "Полное имя" },
    { field: "username", headerName: "Имя пользователя" },
    { field: "created_at", headerName: "Дата создания" },
  ];

  console.log(data);

  const tableData =
    data?.data.map((user: userTypeData) => ({
      ...user,
      created_at: new Date(user.created_at).toLocaleDateString(),
    })) || [];

  if (isError) {
    return <div>Ошибка загрузки данных: {error && JSON.stringify(error)}</div>;
  }

  return (
    <>
      <Box sx={{ textAlign: "right" }}>
        <Button
          component={Link}
          to="add-user"
          color="secondary"
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#125ea8" },
          }}>
          Создать пользователя
        </Button>
      </Box>

      <UniversalTable
        title="Пользователи"
        data={tableData}
        columns={columns}
        isLoading={isLoading}
        onDelete={handleDelete}
        onView={handleView}
      />
    </>
  );
};

export default GetAllData;
