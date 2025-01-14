import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import {
  useGetOneUserQuery,
  useUpdateOneUserMutation,
} from "../../app/api/companySlice";
import useSnackbar from "../../app/types/callSnackBar";

const SinglePage: React.FC = () => {
  const triggerSnackbar = useSnackbar();
  const { id } = useParams(); 
  const { data, isLoading, isError, error } = useGetOneUserQuery({ id });
  const [updateUser, { isLoading: isUpdating }] = useUpdateOneUserMutation();

  const [isEditing, setIsEditing] = useState(false); 
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (data?.data) {
      setFormData({
        full_name: data.data.full_name,
        username: data.data.username,
        password: "", 
      });
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateUser({ id, body: formData }).unwrap();
      triggerSnackbar("Данные успешно обновлены!", "success");
      setIsEditing(false); 
    } catch (err) {
      console.error("Ошибка обновления данных:", err);
      triggerSnackbar("Не удалось обновить данные", "error");
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

  if (isError) {
    return (
      <Typography
        color="error"
        variant="h6"
        sx={{ textAlign: "center", marginTop: "2rem" }}>
        Ошибка загрузки данных: {error && JSON.stringify(error)}
      </Typography>
    );
  }

  if (!data?.data) {
    return (
      <Typography
        color="textSecondary"
        variant="h6"
        sx={{ textAlign: "center", marginTop: "2rem" }}>
        Данные не найдены.
      </Typography>
    );
  }

  const { created_at, updated_at } = data.data;

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
        Редактировать пользователя
      </Typography>
      <Box>
        <TextField
          fullWidth
          label="Полное имя"
          name="full_name"
          value={formData.full_name}
          onChange={handleInputChange}
          margin="normal"
          InputProps={{
            readOnly: !isEditing,
          }}
        />
        <TextField
          fullWidth
          label="Имя пользователя"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          margin="normal"
          InputProps={{
            readOnly: !isEditing,
          }}
        />
        <TextField
          fullWidth
          label="Пароль"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          margin="normal"
          InputProps={{
            readOnly: !isEditing,
          }}
          helperText={
            isEditing
              ? "Оставьте поле пустым, если не хотите менять пароль"
              : ""
          }
        />
        <Typography variant="body2" sx={{ marginTop: "1rem" }}>
          <strong>Дата создания:</strong>{" "}
          {new Date(created_at).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: "1rem" }}>
          <strong>Дата обновления:</strong>{" "}
          {new Date(updated_at).toLocaleDateString()}
        </Typography>
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
        </Box>
      </Box>
    </Box>
  );
};

export default SinglePage;
