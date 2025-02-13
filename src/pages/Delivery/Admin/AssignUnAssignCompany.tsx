import { Button, Paper } from "@mui/material";
// import {
//   useAdminAssignCompanyMutation,
//   useAdminUnAssignCompanyMutation,
// } from "../../../app/api/deliverySlice";
import { useState } from "react";
import GetAllCompany from "../Company/GetAllCompany";

interface AssignUnAssignCompanyProps {
  adminId: string | undefined;
}

const AssignUnAssignCompany = ({ adminId }: AssignUnAssignCompanyProps) => {
  //   const { data } = useAdminAssignCompanyMutation();
  //   const { isLoading } = useAdminUnAssignCompanyMutation();
  const [open, setOpen] = useState(false);

  const handleSetAssignIdCompany = (id: string, is_assigned: boolean) => {
    if (is_assigned) {
      console.log("уже связанно");
    } else {
      console.log(id, is_assigned);
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        margin: "1rem",
        padding: "1rem",
        borderRadius: "8px",
      }}>
      <Button
        color="secondary"
        variant="contained"
        sx={{
          textTransform: "none",
          fontWeight: "bold",
          backgroundColor: "#1976d2",
          "&:hover": { backgroundColor: "#125ea8" },
        }}
        onClick={() => setOpen(!open)}>
        Связать Админа
      </Button>

      {open && (
        <GetAllCompany
          handleSetAssignIdCompany={handleSetAssignIdCompany}
          adminId={adminId}
        />
      )}
    </Paper>
  );
};

export default AssignUnAssignCompany;
