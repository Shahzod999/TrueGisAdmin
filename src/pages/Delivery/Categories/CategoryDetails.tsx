import { useNavigate, useParams } from "react-router";
import {
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetSingleCategoryQuery,
} from "../../../app/api/deliverySlice";
import UniversalDetails from "../../../components/UniversalDetails/UniversalDetails";
import Loading from "../../../components/Loading";

const CategoryDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: categoryData, isLoading } = useGetSingleCategoryQuery(id);
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const fetchData = async () => {
    if (!categoryData) throw new Error("Данные отсутствуют");
    return categoryData?.data;
  };

  const handleUpdate = async (id: string, data: Record<string, any>) => {
    await updateCategory({ id, data }).unwrap();
  };

  const handleDelete = async (id: string) => {
    await deleteCategory(id).unwrap();
    navigate(-1);
  };

  const fields = [
    { name: "name", label: "Название категории", required: true },
  ];

  if (isLoading) return <Loading />;

  return (
    <UniversalDetails
      title="Детали категории"
      id={id || ""}
      fetchData={fetchData}
      updateData={handleUpdate}
      deleteData={handleDelete}
      fields={fields}
      redirectAfterDelete="/categories"
    />
  );
};

export default CategoryDetails;
