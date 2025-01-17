import { useNavigate, useParams } from "react-router";
import {
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from "../../../app/api/deliverySlice";
import UniversalDetails from "../../../components/UniversalDetails/UniversalDetails";
import Loading from "../../../components/Loading";

const CategoryDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: categoryData, isLoading } = useGetAllCategoryQuery({ page: 1 });
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

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
      fetchData={() =>
        Promise.resolve(
          categoryData?.data.find((item: { _id: string }) => item._id === id),
        )
      }
      updateData={handleUpdate}
      deleteData={handleDelete}
      fields={fields}
      redirectAfterDelete="/categories"
    />
  );
};

export default CategoryDetails;
