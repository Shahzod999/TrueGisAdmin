import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleUpdateCompanyQuery,
  usePutUpdateCompanyMutation,
  useDeleteUpdateCompanyMutation,
} from "../../../app/api/deliverySlice";
import Loading from "../../../components/Loading";
import { Box, Typography, Paper, Button } from "@mui/material";
import useSnackbar from "../../../app/hook/callSnackBar";
import { PhotosSample } from "../../../app/types/companyType";
import ImagesList from "../../../components/UniversalImgUploader/ImagesList";

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

  const { data, isLoading, isError } = useGetSingleUpdateCompanyQuery(id || "");
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

  const renderObjectData = (
    current: Record<string, any> | null | undefined,
    requested: Record<string, any> | null | undefined,
    parentKey = "",
  ) => {
    if (!requested || typeof requested !== "object") return null;

    return Object.keys(requested).map((key) => {
      const currentValue = current ? current[key] : undefined;
      const requestedValue = requested[key];
      const displayKey = parentKey ? `${parentKey}.${key}` : key;

      let color =
        currentValue === requestedValue
          ? "inherit"
          : currentValue
          ? "red"
          : "green";

      if (
        requestedValue &&
        typeof requestedValue === "object" &&
        !Array.isArray(requestedValue)
      ) {
        return (
          <Box key={displayKey} sx={{ marginBottom: 2 }}>
            <Typography variant="h6">{displayKey}</Typography>
            {renderObjectData(currentValue || {}, requestedValue, displayKey)}
          </Box>
        );
      } else {
        return (
          <Typography key={displayKey} color={color}>
            <strong>{displayKey}:</strong>{" "}
            {requestedValue !== null && requestedValue !== undefined
              ? requestedValue.toString()
              : "-"}
          </Typography>
        );
      }
    });
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <Button variant="contained" color="error" onClick={() => navigate(-1)}>
        Чтото пошло не так
      </Button>
    );

  return (
    <Box display="flex" flexDirection="column" gap={3} padding={3}>
      <Typography variant="h4" align="center">
        Сравнение данных компании
      </Typography>

      <Paper
        elevation={3}
        sx={{
          padding: 3,
          backgroundColor:
            data?.data?.status === "approved" ? "#e8f5e9" : "#f9f9f9",
          border:
            data?.data?.status === "approved" ? "2px solid #4caf50" : "none",
        }}>
        <Typography variant="h5" textAlign={"center"}>
          {data?.data?.status === "approved"
            ? "Изменения приняты"
            : "Информация об изменении"}
        </Typography>
        <Typography>
          <strong>Запрос от:</strong> {data?.data?.requester_name}
        </Typography>
        <Typography>
          <strong>Телефон:</strong> {data?.data?.requester_phone_number}
        </Typography>
        <Typography>
          <strong>Должность:</strong> {data?.data?.requester_position}
        </Typography>
        <Typography>
          <strong>Дата создания:</strong>{" "}
          {new Date(data?.data?.created_at).toLocaleString()}
        </Typography>
        <Typography>
          <strong>Дата обновления:</strong>{" "}
          {new Date(data?.data?.updated_at).toLocaleString()}
        </Typography>
      </Paper>

      <Box display="flex" flexWrap={"wrap"} gap={2}>
        {/* Original Data */}
        <Paper
          elevation={3}
          sx={{ flex: 1, padding: 2, backgroundColor: "#f0f4f8" }}>
          <Typography variant="h6">Текущие данные</Typography>
          <Box sx={{ margin: "20px 0" }}>
            <ImagesList
              imageData={data?.data?.current_data?.photos_sample?.map(
                (item: PhotosSample) => item.photo_url,
              )}
            />
          </Box>
          {data?.data.current_data ? (
            renderObjectData(data.data.current_data, data.data.current_data)
          ) : (
            <Typography>Нет данных</Typography>
          )}
        </Paper>

        {/* Requested Changes */}
        <Paper
          elevation={3}
          sx={{ flex: 1, padding: 2, backgroundColor: "#e8f5e9" }}>
          <Typography variant="h6">Запрошенные изменения</Typography>
          <Box sx={{ margin: "20px 0" }}>
            <ImagesList
              imageData={data?.data?.requested_changes?.photos_sample?.map(
                (item: PhotosSample) => item.photo_url,
              )}
            />
          </Box>

          {data?.data.requested_changes ? (
            renderObjectData(
              data.data.current_data || {},
              data.data.requested_changes,
            )
          ) : (
            <Typography>Нет данных</Typography>
          )}
        </Paper>
      </Box>

      <Box display="flex" justifyContent="center" gap={2}>
        {data?.data?.status == "approved" ? (
          <>
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate(-1)}>
              Данные уже изменены
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" color="success" onClick={handleUpdate}>
              Применить изменения
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Удалить запрос
            </Button>
          </>
        )}
      </Box>
      <Typography>
        если данные переписаны от старых значений "текст красный"
      </Typography>
      <Typography>
        если данные раньше не были и добавлены то "текст зеленый
      </Typography>
    </Box>
  );
};

export default UpdateCompanySinglePage;
