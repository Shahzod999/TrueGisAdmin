import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import useSnackbar from "../../app/hook/callSnackBar";

interface Field {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}

interface UniversalAddFormProps {
  title: string;
  fields: Field[];
  onSubmit: (data: Record<string, string>) => Promise<any>;
  isLoading: boolean;
}

const UniversalAddForm: React.FC<UniversalAddFormProps> = ({
  title,
  fields,
  onSubmit,
  isLoading,
}) => {
  const triggerSnackbar = useSnackbar();

  // Инициализация состояния формы
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initialState: Record<string, string> = {};
    fields.forEach((field) => {
      initialState[field.name] = "";
    });
    return initialState;
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
      const response = await onSubmit(formData);

      setSuccessMessage(`Пользователь ${response.status} успешно создан!`);
      triggerSnackbar(
        `Пользователь ${response.status} успешно создан!`,
        "success",
      );

      // Сброс формы
      setFormData(() => {
        const resetState: Record<string, string> = {};
        fields.forEach((field) => {
          resetState[field.name] = "";
        });
        return resetState;
      });
    } catch (err: any) {
      // Обработка ошибок с типом unknown
      if (
        err &&
        typeof err === "object" &&
        "data" in err &&
        err.data &&
        typeof err.data === "object" &&
        "message" in err.data
      ) {
        setError((err.data as any).message);
        triggerSnackbar((err.data as any).message, "error");
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
        {title}
      </Typography>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <TextField
            key={field.name}
            fullWidth
            label={field.label}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            margin="normal"
            required={field.required}
            type={field.type || "text"}
          />
        ))}
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

export default UniversalAddForm;
