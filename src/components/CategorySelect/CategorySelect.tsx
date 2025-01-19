import { MenuItem, TextField, Typography } from "@mui/material";
import { CategoryType } from "../../app/types/productsTypes";

interface CategorySelectProps {
  categoryData: { data: CategoryType[] } | undefined;
  selectedCategory: string;
  handleCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  categoryData,
  selectedCategory,
  handleCategoryChange,
}) => {
  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: 3 }}>
        Категория
      </Typography>
      <TextField
        select
        label="Категория"
        fullWidth
        value={selectedCategory}
        onChange={handleCategoryChange}
        InputLabelProps={{ shrink: true }}
        sx={{ marginBottom: 3 }}>
        {categoryData?.data?.map((category: CategoryType) => (
          <MenuItem key={category._id} value={category._id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default CategorySelect;
