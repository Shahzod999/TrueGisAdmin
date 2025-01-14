import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import useSnackbar from "../../app/hook/callSnackBar";

interface UniversalDetailsProps {
  title: string;
  id: string;
  fetchData: (id: string) => Promise<Record<string, any>>;
  updateData: (id: string, data: Record<string, any>) => Promise<void>;
  deleteData: (id: string) => Promise<void>;
  fields: { name: string; label: string; type?: string }[];
  redirectAfterDelete?: string;
}

const UniversalDetails: React.FC<UniversalDetailsProps> = ({
  title,
  id,
  fetchData,
  updateData,
  deleteData,
  fields,
  redirectAfterDelete,
}) => {
  const triggerSnackbar = useSnackbar();
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetchData(id);

        // Подождем, пока данные полностью загрузятся
        if (!response || Object.keys(response).length === 0) {
          return; // Никакой ошибки не бросаем, просто ждем следующего обновления
        }

        setData(response);

        // Инициализируем форму на основе полученных данных
        const initialFormData: Record<string, any> = {};
        fields.forEach((field) => {
          initialFormData[field.name] = response[field.name] || "";
        });
        setFormData(initialFormData);
      } catch (error) {
        triggerSnackbar(
          error instanceof Error ? error.message : "Ошибка загрузки данных",
          "error",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id, fetchData, fields, triggerSnackbar]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      await updateData(id, formData);
      triggerSnackbar("Данные успешно обновлены!", "success");
      setIsEditing(false);
    } catch (error) {
      triggerSnackbar("Не удалось обновить данные", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteData(id);
      triggerSnackbar("Данные успешно удалены", "success");
      if (redirectAfterDelete) {
        window.location.href = redirectAfterDelete;
      }
    } catch (error) {
      triggerSnackbar("Ошибка удаления данных", "error");
    }
  };

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

  if (!data) {
    return (
      <Typography
        color="textSecondary"
        variant="h6"
        sx={{ textAlign: "center", marginTop: "2rem" }}>
        Данные не найдены.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "2rem",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
      }}
      component={Paper}>
      <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
        {title}
      </Typography>
      <Box>
        {fields.map((field) => (
          <TextField
            key={field.name}
            fullWidth
            label={field.label}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleInputChange}
            margin="normal"
            type={field.type || "text"}
            InputProps={{
              readOnly: !isEditing,
            }}
          />
        ))}
        <Box sx={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          {!isEditing ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}>
              Редактировать
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={handleSave}
                disabled={isUpdating}>
                {isUpdating ? "Сохранение..." : "Сохранить"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setIsEditing(false)}>
                Отмена
              </Button>
            </>
          )}
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Удалить
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UniversalDetails;
