import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  FormControlLabel,
  Paper,
  Grid,
  Divider,
  Switch,
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
      initialState[field.name] = field.type === "checkbox" ? "true" : "";
    });
    return initialState;
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" || type === "switch" ? String(checked) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await onSubmit(formData);
      console.log(response);

      setSuccessMessage(response?.message || "успешно создан!");
      triggerSnackbar(response?.message || "успешно создан!", "success");

      // Сброс формы
      const resetState: Record<string, string> = {};
      fields.forEach((field) => {
        resetState[field.name] = field.type === "checkbox" ? "false" : "";
      });
      setFormData(resetState);
    } catch (err: any) {
      console.log(err);
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
        setError("Ошибка при создании");
        triggerSnackbar("Произошла неизвестная ошибка", "error");
      }
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        // Ширина на весь экран, убираем горизонтальное центрирование
        width: "100%",
        padding: "1.5rem",
        borderRadius: "8px",
        margin: "1rem 0", // небольшой вертикальный отступ
      }}>
      {/* Заголовок */}
      <Typography variant="h5" sx={{ mb: 1 }}>
        {title}
      </Typography>

      {/* Короткое пояснение (опционально) */}
      <Typography
        variant="body2"
        sx={{ mb: 2, color: "text.secondary", lineHeight: 1.4 }}>
        Заполните поля формы и нажмите «Создать». Обязательные поля помечены как
        required.
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {fields.map((field) => (
            <Grid key={field.name} item xs={12} sm={6}>
              {field.type === "checkbox" ? (
                // Вместо Checkbox используем Switch (ползунок)
                <FormControlLabel
                  control={
                    <Switch
                      name={field.name}
                      // Для Switch проверяем: "true" => включено
                      checked={formData[field.name] === "true"}
                      onChange={handleChange}
                      color="primary"
                      size="medium"
                    />
                  }
                  label={field.label}
                />
              ) : (
                <TextField
                  fullWidth
                  label={field.label}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  type={field.type || "text"}
                  variant="outlined"
                  size="small"
                  margin="dense"
                />
              )}
            </Grid>
          ))}
        </Grid>

        {/* Блок с сообщениями об ошибке или успехе */}
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        {successMessage && (
          <Typography color="primary" variant="body2" sx={{ mt: 2 }}>
            {successMessage}
          </Typography>
        )}

        <Box sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            sx={{ minWidth: "120px" }}>
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Создать"
            )}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default UniversalAddForm;
