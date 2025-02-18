import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControlLabel,
  Grid,
  Divider,
  Switch,
} from "@mui/material";
import useSnackbar from "../../app/hook/callSnackBar";
import Loading from "../Loading";
import { useNavigate } from "react-router";

interface UniversalDetailsProps {
  title: string;
  id: string;
  fetchData: (id: string) => Promise<Record<string, any>>;
  updateData: (id: string, data: Record<string, any>) => Promise<void>;
  deleteData: (id: string) => Promise<void>;
  fields: {
    name: string;
    label: string;
    type?: string;
    noteditable?: boolean;
  }[];
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
  const navigate = useNavigate();
  const triggerSnackbar = useSnackbar();
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isUpdating, setIsUpdating] = useState(false);

  // --- Вспомогательные функции для вложенных полей ---
  const getNestedValue = (obj: Record<string, any>, path: string): any => {
    return path
      .split(".")
      .reduce(
        (acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""),
        obj,
      );
  };
  const setNestedValue = (
    obj: Record<string, any>,
    path: string,
    value: any,
  ): void => {
    const keys = path.split(".");
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!current[key]) {
        current[key] = {};
      }
      current = current[key];
    }

    current[keys[keys.length - 1]] = value;
  };

  // --- Загрузка данных при монтировании/смене id ---
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetchData(id);
        if (!response || Object.keys(response).length === 0) {
          return; // Нет данных — не обновляем state
        }
        setData(response);

        // Инициализируем formData на основе полученных данных
        const initialFormData: Record<string, any> = {};
        fields.forEach((field) => {
          initialFormData[field.name] = getNestedValue(response, field.name);
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
  }, [id]);

  // --- Обработчики ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" || type === "switch" ? checked : value,
    }));
  };

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      const updatedData: Record<string, any> = {};
      fields.forEach((field) => {
        setNestedValue(updatedData, field.name, formData[field.name]);
      });

      await updateData(id, updatedData);

      triggerSnackbar("Данные успешно обновлены!", "success");
      setIsEditing(false);
    } catch (error: any) {
      console.log(error);

      triggerSnackbar(
        error?.data?.error_name || "Не удалось обновить данные",
        "error",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteData(id);
      triggerSnackbar("Данные успешно удалены", "success");
      if (redirectAfterDelete) {
        navigate(redirectAfterDelete);
      }
    } catch (error) {
      triggerSnackbar("Ошибка удаления данных", "error");
    }
  };

  // --- Состояния загрузки/пустых данных ---
  if (isLoading) {
    return <Loading />;
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

  // --- Шаблон визуального отображения ---
  return (
    <Paper
      elevation={2}
      sx={{
        margin: "1rem",
        padding: "1rem",
        borderRadius: "8px",
      }}>
      {/* Заголовок всего блока */}
      <Typography variant="h5" sx={{ marginBottom: "0.5rem" }}>
        {title}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          marginBottom: "1rem",
          color: "text.secondary",
          lineHeight: 1.4,
        }}>
        Просмотрите и при необходимости измените данные. Чтобы отредактировать
        поле — нажмите «Редактировать», внесите изменения и сохраните. Для
        удаления элемента воспользуйтесь соответствующей кнопкой.
      </Typography>

      {/* Блок с полями */}
      <Typography variant="subtitle1" sx={{ marginBottom: "0.5rem" }}>
        Информация
      </Typography>
      <Grid container spacing={1}>
        {fields.map((field) =>
          field.type === "header" ? (
            <Box
              key={field.name || field.label}
              width={"100%"}
              textAlign={"center"}>
              <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 1 }}>
                {field.label}
              </Typography>
            </Box>
          ) : (
            <Grid key={field.name || field.label} item xs={12} sm={6}>
              {field.type === "checkbox" ? (
                <FormControlLabel
                  sx={{ marginTop: 0 }}
                  control={
                    <Switch
                      name={field.name}
                      checked={!!formData[field.name]}
                      onChange={handleInputChange}
                      disabled={!isEditing || field.noteditable}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ lineHeight: 1.3 }}>
                      {field.label}
                    </Typography>
                  }
                />
              ) : (
                <TextField
                  fullWidth
                  variant="outlined"
                  size="medium"
                  margin="dense"
                  label={field.label}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  type={field.type || "text"}
                  InputProps={{
                    readOnly: !isEditing || field.noteditable,
                  }}
                />
              )}
            </Grid>
          ),
        )}
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Блок кнопок редактирования/удаления */}
      <Typography variant="subtitle1" sx={{ marginBottom: "0.5rem" }}>
        Действия
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {!isEditing ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEditing(true)}
            size="small">
            Редактировать
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              color="success"
              onClick={handleSave}
              disabled={isUpdating}
              size="small">
              {isUpdating ? "Сохранение..." : "Сохранить"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setIsEditing(false)}
              size="small">
              Отмена
            </Button>
          </>
        )}
        <Button
          variant="outlined"
          color="error"
          onClick={handleDelete}
          size="small">
          Удалить
        </Button>
      </Box>
    </Paper>
  );
};

export default UniversalDetails;
