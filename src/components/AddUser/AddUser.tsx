import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

import { useAddnewUserMutation } from "../../app/api/companySlice";
import { ErrorType } from "../../app/types/userType";
import useSnackbar from "../../app/types/callSnackBar";

const AddUser = () => {
  const triggerSnackbar = useSnackbar();
  const [addNewUser, { isLoading }] = useAddnewUserMutation();
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
    console.log(formData);

    try {
      const response = await addNewUser({
        data: formData,
      }).unwrap();
      setSuccessMessage(`Пользователь ${response.status} успешно создан!`);
      triggerSnackbar(
        `Пользователь ${response.status} успешно создан!`,
        "success",
      );
      setFormData({ full_name: "", username: "", password: "" });
    } catch (error: any) {
      if (
        error &&
        typeof error === "object" &&
        "data" in error &&
        "message" in (error as any).data
      ) {
        setError((error as ErrorType).data.message);
        triggerSnackbar((error as ErrorType).data.message, "error");
      } else {
        setError("Ошибка при создании пользователя");
        triggerSnackbar("Произошла неизвестная ошибка", "error");
      }
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
