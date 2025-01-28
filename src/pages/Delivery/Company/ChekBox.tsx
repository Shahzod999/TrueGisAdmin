import React from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Select,
  MenuItem,
  Switch,
  Typography,
  FormLabel,
} from "@mui/material";

export interface FieldConfig {
  name: string;
  label: string;
  type: "switch" | "select"; // Ограничиваем тип только на разрешенные значения
  options?: { value: string; label: string }[]; // Опционально, только для "select"
}

interface BusinessSettingsFormProps {
  values: { [key: string]: boolean | string };
  onChange: (name: string, value: boolean | string) => void;
  fields: FieldConfig[];
}

const BusinessSettingsForm: React.FC<BusinessSettingsFormProps> = ({
  values,
  onChange,
  fields,
}) => {
  return (
    <Box
      sx={{
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        boxShadow: 2,
        maxWidth: "98%",
        mx: "auto",
        backgroundColor: "#fff",
      }}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
        Опции
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}>
        {fields?.map((field) => {
          if (field.type === "switch") {
            return (
              <FormControlLabel
                key={field.name}
                control={
                  <Switch
                    checked={!!values[field.name]}
                    onChange={(e) => onChange(field.name, e.target.checked)}
                  />
                }
                label={field.label}
              />
            );
          }

          if (field.type === "select") {
            return (
              <FormControl key={field.name} fullWidth>
                <FormLabel sx={{ mb: 1, fontWeight: "bold" }}>
                  {field.label}
                </FormLabel>
                <Select
                  value={values[field.name] || ""}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  displayEmpty
                  variant="outlined">
                  <MenuItem value="" disabled>
                    Выберите {field.label.toLowerCase()}
                  </MenuItem>
                  {field.options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          }

          return null; // Игнорируем неизвестные типы
        })}
      </Box>
    </Box>
  );
};

export default BusinessSettingsForm;
