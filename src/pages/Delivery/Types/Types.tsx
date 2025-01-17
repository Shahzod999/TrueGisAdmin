import { Box, Button } from "@mui/material";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

const Types = () => {
  return (
    <div>
      <Box sx={{ textAlign: "right" }}>
        <Button
          component={Link}
          to="add-newTypes"
          color="secondary"
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#125ea8" },
          }}>
          Создать Тип
        </Button>
      </Box>
      <Outlet />
    </div>
  );
};

export default Types;
