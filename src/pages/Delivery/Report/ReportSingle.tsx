import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleReportQuery,
  useUpdateReportMutation,
} from "../../../app/api/deliverySlice";
import UniversalDetails from "../../../components/UniversalDetails/UniversalDetails";
import Loading from "../../../components/Loading";

const ReportSingle = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetSingleReportQuery({ id });
  const [updateReport] = useUpdateReportMutation();

  const fetchData = async () => {
    if (!data) throw new Error("Данные отсутствуют");
    return data?.data;
  };

  const updateOneData = async (
    id: string,
    updatedData: Record<string, any>,
  ) => {
    let res = await updateReport({ id, data: updatedData }).unwrap();
    console.log(res, updatedData);
  };

  const deleteData = async (id: string) => {
    console.log(id);
    navigate(-1); // Перенаправление после удаления
  };

  const fields = [
    { name: "report_name", label: "Название отчета" },
    { name: "created_at", label: "Дата создания" },
    { name: "status", label: "Статус" },
    { name: "author.name", label: "Автор" },
    { name: "description", label: "Описание" },
    { name: "type", label: "Тип отчета" },
    { name: "total_items", label: "Количество записей" },
    { name: "processed_items", label: "Обработанные записи" },
    { name: "error_count", label: "Ошибки" },
    { name: "is_completed", label: "Завершено", type: "checkbox" },
    { name: "updated_at", label: "Дата обновления" },
  ];

  if (isLoading) return <Loading />;

  return (
    <UniversalDetails
      title="Детали отчета"
      id={id || ""}
      fetchData={fetchData}
      updateData={updateOneData}
      deleteData={deleteData}
      fields={fields}
      redirectAfterDelete="/reports"
    />
  );
};

export default ReportSingle;
