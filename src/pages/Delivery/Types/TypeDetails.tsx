import { useNavigate, useParams } from "react-router";
import {
  useDeleteTypeMutation,
  useGetAllTypesQuery,
  useUpdateTypeMutation,
} from "../../../app/api/deliverySlice";
import UniversalDetails from "../../../components/UniversalDetails/UniversalDetails";
import Loading from "../../../components/Loading";

type TypeData = {
  _id: string;
  name: string;
};

const TypeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: typeData, isLoading } = useGetAllTypesQuery({});
  const [updateType] = useUpdateTypeMutation();
  const [deleteType] = useDeleteTypeMutation();

  const handleUpdate = async (id: string, data: Record<string, string>) => {
    await updateType({ id, data }).unwrap();
  };

  const handleDelete = async (id: string) => {
    await deleteType(id).unwrap();
    navigate(-1);
  };

  const fields = [{ name: "name", label: "Название типа", required: true }];
  if (isLoading) return <Loading />;

  return (
    <UniversalDetails
      title="Детали типа"
      id={id || ""}
      fetchData={() =>
        Promise.resolve(
          typeData?.data.find((item: TypeData) => item._id === id),
        )
      }
      updateData={handleUpdate}
      deleteData={handleDelete}
      fields={fields}
      redirectAfterDelete="/types" // Update with actual redirect path
    />
  );
};

export default TypeDetails;
