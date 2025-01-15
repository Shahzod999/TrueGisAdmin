import { Box, Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const Company = () => {
  return (
    <div>
      <Box sx={{ textAlign: "right" }}>
        <Button
          component={Link}
          to="add-newCompany"
          color="secondary"
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#125ea8" },
          }}>
          Создать Компанию
        </Button>
      </Box>
      <Outlet />
    </div>
  );
};

export default Company;
