import {
  useDeleteSingleAdminMutation,
  useGetSingleAdminQuery,
  useUpdateSingleAdminMutation,
} from "../../../app/api/deliverySlice";
import { useParams, useNavigate } from "react-router-dom";
import UniversalDetails from "../../../components/UniversalDetails/UniversalDetails";
import { Box, CircularProgress } from "@mui/material";

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
    return data;
  };

  const updateData = async (id: string, updatedData: Record<string, any>) => {
    await updateSingleAdmin({ id, ...updatedData }).unwrap();
  };

  const deleteData = async (id: string) => {
    await deleteSingleAdmin({ id }).unwrap();
    navigate("/delivery/admin");
  };

  const fields = [
    { name: "full_name", label: "Full Name" },
    { name: "username", label: "Username" },
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
