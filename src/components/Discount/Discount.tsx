import { TextField, Typography } from "@mui/material";

interface DiscountProps {
  discount: {
    price: number | undefined;
    start_date: string | undefined;
    end_date: string | undefined;
  };
  handleDiscount: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Discount: React.FC<DiscountProps> = ({ discount, handleDiscount }) => {
  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: 3 }}>
        Скидка
      </Typography>
      <TextField
        name="price"
        label="Цена со скидкой"
        fullWidth
        value={discount.price || ""}
        InputLabelProps={{ shrink: true }}
        sx={{ marginBottom: 3 }}
        onChange={handleDiscount}
      />
      <TextField
        name="start_date"
        label="Дата начала скидки"
        type="date"
        fullWidth
        value={discount.start_date || ""}
        InputLabelProps={{ shrink: true }}
        sx={{ marginBottom: 3 }}
        onChange={handleDiscount}
      />
      <TextField
        name="end_date"
        label="Дата окончания скидки"
        type="date"
        fullWidth
        value={discount.end_date || ""}
        InputLabelProps={{ shrink: true }}
        sx={{ marginBottom: 3 }}
        onChange={handleDiscount}
      />
    </>
  );
};

export default Discount;
