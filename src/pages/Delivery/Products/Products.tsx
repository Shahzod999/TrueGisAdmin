import { Box, Button } from "@mui/material";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

const Products = () => {
  return (
    <div>
      <Box sx={{ textAlign: "right" }}>
        <Button
          component={Link}
          to="add-newProduct"
          color="secondary"
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#125ea8" },
          }}>
          Добавить Продукт
        </Button>
      </Box>
      <Outlet />
    </div>
  );
};

export default Products;
