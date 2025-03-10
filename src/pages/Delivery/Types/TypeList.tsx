import { useNavigate } from "react-router";
import {
  useDeleteTypeMutation,
  useGetAllTypesQuery,
} from "../../../app/api/deliverySlice";
import UniversalTable from "../../../components/UniversalTable/UniversalTable";

const TypeList = () => {
  const { data, isLoading, isFetching } = useGetAllTypesQuery({});
  const [deleteType] = useDeleteTypeMutation();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    await deleteType(id).unwrap();
  };

  const handleView = (id: string) => {
    navigate(id);
  };

  const columns = [
    { field: "_id", headerName: "ID" },
    { field: "name", headerName: "Название типа" },
    { field: "created_by", headerName: "Создано пользователем" },
    { field: "created_at", headerName: "Дата создания" },
  ];

  return (
    <UniversalTable
      title="Список типов"
      data={data?.data || []}
      columns={columns}
      isLoading={isLoading || isFetching}
      onDelete={handleDelete}
      onView={handleView}
    />
  );
};

export default TypeList;
