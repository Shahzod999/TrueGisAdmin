import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { CategoryType } from "../../../app/types/productsTypes";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

interface categoryButtonsProps {
  categories: CategoryType[];
  onSelect: (id: string) => void;
}

const CategoryButtons = ({ categories, onSelect }: categoryButtonsProps) => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onSelect(categoryId);
  };
  const handleNavigate = () => {
    navigate(`/delivery-categories/${companyId}`);
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ flexWrap: "wrap", justifyContent: "center", mt: 2 }}>
      <Button
        onClick={handleNavigate}
        sx={{
          textTransform: "none",
          padding: "12px 24px",
          fontSize: "1rem",
          fontWeight: "bold",
        }}>
        Категории
      </Button>
      {categories.map((category: CategoryType) => (
        <Button
          key={category._id}
          onClick={() => handleSelect(category._id || "")}
          variant={selectedCategory === category._id ? "contained" : "outlined"}
          color="primary"
          sx={{
            textTransform: "none",
            padding: "12px 24px",
            fontSize: "1rem",
            fontWeight: "bold",
            boxShadow:
              selectedCategory === category._id
                ? "0 4px 10px rgba(0, 0, 0, 0.2)"
                : "none",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor:
                selectedCategory === category._id ? "primary.dark" : "grey.200",
            },
          }}>
          {category.name}
        </Button>
      ))}
    </Stack>
  );
};

export default CategoryButtons;
