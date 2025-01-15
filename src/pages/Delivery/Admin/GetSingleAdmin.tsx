import {
  useDeleteSingleAdminMutation,
  useGetSingleAdminQuery,
  useUpdateSingleAdminMutation,
} from "../../../app/api/deliverySlice";
import { useParams, useNavigate } from "react-router-dom";
import UniversalDetails from "../../../components/UniversalDetails/UniversalDetails";

import Loading from "../../../components/Loading";

const GetSingleAdmin = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [deleteSingleAdmin] = useDeleteSingleAdminMutation();
  const [updateSingleAdmin] = useUpdateSingleAdminMutation();
  const { data, isLoading } = useGetSingleAdminQuery({ id });

  const fetchData = async () => {
    if (!data) {
      throw new Error("Данные еще не загружены");
    }
    return data.data;
  };

  const updateData = async (
    id: string,
    updatedNewData: Record<string, any>,
  ) => {
    console.log({ id, data: updatedNewData });
    await updateSingleAdmin({ id, data: updatedNewData }).unwrap();
  };

  const deleteData = async (id: string) => {
    await deleteSingleAdmin({ id }).unwrap();
    navigate("/delivery/admin");
  };

  const fields = [
    { name: "full_name", label: "Full Name" },
    { name: "username", label: "username" },
    { name: "password", label: "password" },
    { name: "admin_role", label: "admin_role" },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <UniversalDetails
      title="Admin Details"
      id={id || ""}
      fetchData={fetchData}
      updateData={updateData}
      deleteData={deleteData}
      fields={fields}
      redirectAfterDelete="/delivery/admin"
    />
  );
};

export default GetSingleAdmin;
