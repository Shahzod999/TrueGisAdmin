import UniversalTable from "../../../components/UniversalTable/UniversalTable";
import {
  useDeleteSingleAdminMutation,
  useGetAdminDataQuery,
} from "../../../app/api/deliverySlice";
import { useNavigate } from "react-router";
import useSnackbar from "../../../app/hook/callSnackBar";

const GetAllAdmin = () => {
  const navigate = useNavigate();
  const triggerSnackbar = useSnackbar();
  const [deleteSingleAdmin] = useDeleteSingleAdminMutation();
  const { data, error, isLoading } = useGetAdminDataQuery();

  const handleDelete = async (id: string) => {
    try {
      await deleteSingleAdmin({ id }).unwrap();
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
    { field: "full_name", headerName: "Full Name" },
    { field: "username", headerName: "Username" },
    { field: "signature", headerName: "Signature" },
    { field: "created_by", headerName: "Created By" },
    { field: "created_at", headerName: "Created At" },
    { field: "deleted", headerName: "Deleted" },
  ];

  const tableData =
    data?.data.map((admin) => ({
      ...admin,
      created_at: new Date(admin.created_at).toLocaleString(),
      deleted: admin.deleted ? "Yes" : "No",
    })) || [];

  if (error) {
    return (
      <div>
        Error: {(error as any)?.data?.message || "Something went wrong"}
      </div>
    );
  }
console.log(tableData);

  return (
    <UniversalTable
      title="Admin Panel"
      data={tableData}
      columns={columns}
      isLoading={isLoading}
      onDelete={handleDelete}
      onView={handleView}
    />
  );
};

export default GetAllAdmin;
