import React from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Select,
  MenuItem,
  Switch,
  Typography,
  useMediaQuery,
  FormLabel
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Определение типов свойств
interface BusinessSettingsFormProps {
  values: {
    is_partner: boolean;
    is_accept_orders: boolean;
    has_menu: boolean;
    order_type: string;
  };
  onChange: (name: string, value: boolean | string) => void;
}

const BusinessSettingsForm: React.FC<BusinessSettingsFormProps> = ({
  values,
  onChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
        Опции
      </Typography>

      {/* Ползунки в строку */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={values.is_partner}
              onChange={(e) => onChange("is_partner", e.target.checked)}
            />
          }
          label="Партнер"
        />
        <FormControlLabel
          control={
            <Switch
              checked={values.is_accept_orders}
              onChange={(e) => onChange("is_accept_orders", e.target.checked)}
            />
          }
          label="Принимает заказы"
        />
        <FormControlLabel
          control={
            <Switch
              checked={values.has_menu}
              onChange={(e) => onChange("has_menu", e.target.checked)}
            />
          }
          label="Есть Меню"
        />
      </Box>

      {/* Выбор типа заказа */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <FormLabel sx={{ mb: 1, fontWeight: "bold" }}>Тип заказа</FormLabel>
        <Select
          value={values.order_type}
          onChange={(e) => onChange("order_type", e.target.value)}
          displayEmpty
          variant="outlined"
        >
          <MenuItem value="" disabled>
            Выберите тип заказа
          </MenuItem>
          <MenuItem value="delivery_pickup">Самовывоз/Доставка</MenuItem>
          <MenuItem value="appointment">По записи</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default BusinessSettingsForm;
