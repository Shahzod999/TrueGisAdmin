import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

import { useAddnewUserMutation } from "../../app/api/companySlice";

const AddUser = () => {
  const [addNewUser, { isLoading }] = useAddnewUserMutation(); // Хук для API-запроса
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await addNewUser({
        body: formData, // Передаем данные из формы
      }).unwrap(); // Разворачиваем ответ

      setSuccessMessage(`Пользователь ${response.status} успешно создан!`);
      setFormData({ full_name: "", username: "", password: "" }); // Очищаем форму
    } catch (err: any) {
      setError(err?.message || "Ошибка при создании пользователя");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "2rem",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
      }}>
      <Typography variant="h5" gutterBottom>
        Создать нового пользователя
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Полное имя"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Имя пользователя"
          name="username"
          value={formData.username}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Пароль"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
        />
        {error && (
          <Typography color="error" variant="body2" sx={{ margin: "1rem 0" }}>
            {error}
          </Typography>
        )}
        {successMessage && (
          <Typography color="primary" variant="body2" sx={{ margin: "1rem 0" }}>
            {successMessage}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
          sx={{ marginTop: "1rem" }}>
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Создать"
          )}
        </Button>
      </form>
    </Box>
  );
};

export default AddUser;
