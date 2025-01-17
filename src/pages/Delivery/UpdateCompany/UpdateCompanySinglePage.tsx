import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleUpdateCompanyQuery,
  usePutUpdateCompanyMutation,
  useDeleteUpdateCompanyMutation,
} from "../../../app/api/deliverySlice";
import Loading from "../../../components/Loading";
import { Box, Typography, Paper, Button } from "@mui/material";
import useSnackbar from "../../../app/hook/callSnackBar";

export interface Root {
  error: Error;
}

export interface Error {
  status: number;
  data: Data;
}

export interface Data {
  status: string;
  message: string;
  error_name: string;
}

const UpdateCompanySinglePage = () => {
  const triggerSnackbar = useSnackbar();

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetSingleUpdateCompanyQuery(id || "");
  const [updateCompany] = usePutUpdateCompanyMutation();
  const [deleteCompany] = useDeleteUpdateCompanyMutation();

  const handleUpdate = async () => {
    try {
      let res = await updateCompany({
        id,
        data: { status: "approved" },
      });
      if ((res as Root).error?.data?.message) {
        throw new Error((res as Root).error.data.message);
      }
      triggerSnackbar("Данные успешно обновлены!", "success");
    } catch (error: any) {
      console.log(error);
      triggerSnackbar(error.message || "Не удалось обновить данные", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCompany(id);
      triggerSnackbar("Данные успешно удалены!", "success");
      navigate(-1);
    } catch (error: any) {
      triggerSnackbar(error.message || "Не удалось удалить данные", "error");
    }
  };

  const renderObjectData = (obj: Record<string, any>, parentKey = "") => {
    return Object.entries(obj).map(([key, value]) => {
      const displayKey = parentKey ? `${parentKey}.${key}` : key;
      if (value && typeof value === "object" && !Array.isArray(value)) {
        return (
          <Box key={displayKey} sx={{ marginBottom: 2 }}>
            <Typography variant="h6">{displayKey}</Typography>
            {renderObjectData(value, displayKey)}
          </Box>
        );
      } else {
        return (
          <Typography key={displayKey}>
            <strong>{displayKey}:</strong>{" "}
            {value !== null && value !== undefined ? value.toString() : "-"}
          </Typography>
        );
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <Box display="flex" flexDirection="column" gap={3} padding={3}>
      <Typography variant="h4" align="center">
        Сравнение данных компании
      </Typography>

      <Box display="flex" gap={2}>
        {/* Original Data */}
        <Paper
          elevation={3}
          sx={{ flex: 1, padding: 2, backgroundColor: "#f0f4f8" }}>
          <Typography variant="h6">Текущие данные</Typography>
          {data?.data.current_data ? (
            renderObjectData(data.data.current_data)
          ) : (
            <Typography>Нет данных</Typography>
          )}
        </Paper>

        {/* Requested Changes */}
        <Paper
          elevation={3}
          sx={{ flex: 1, padding: 2, backgroundColor: "#e8f5e9" }}>
          <Typography variant="h6">Запрошенные изменения</Typography>
          {data?.data.requested_changes ? (
            renderObjectData(data.data.requested_changes)
          ) : (
            <Typography>Нет данных</Typography>
          )}
        </Paper>
      </Box>

      <Box display="flex" justifyContent="center" gap={2}>
        <Button variant="contained" color="success" onClick={handleUpdate}>
          Применить изменения
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Удалить запрос
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateCompanySinglePage;
