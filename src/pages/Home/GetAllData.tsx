import {
  useGetAllUserQuery,
  useDeleteUserMutation,
} from "../../app/api/companySlice";
import { useNavigate } from "react-router";
import useSnackbar from "../../app/hook/callSnackBar";
import UniversalTable from "../../components/UniversalTable/UniversalTable";
import { userTypeData } from "../../app/types/userType";

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
    <UniversalTable
      title="Пользователи"
      data={tableData}
      columns={columns}
      isLoading={isLoading}
      onDelete={handleDelete}
      onView={handleView}
    />
  );
};

export default GetAllData;
