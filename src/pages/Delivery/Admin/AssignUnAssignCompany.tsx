import { Button, Paper } from "@mui/material";
import {
  useAdminAssignCompanyMutation,
  useAdminUnAssignCompanyMutation,
} from "../../../app/api/deliverySlice";
import { useState } from "react";
import GetAllCompany from "../Company/GetAllCompany";
import Loading from "../../../components/Loading";
import PermissionsPopup, { permissionsType } from "./PermissionsPopup";
import useSnackbar from "../../../app/hook/callSnackBar";

interface AssignUnAssignCompanyProps {
  adminId: string | undefined;
}

const AssignUnAssignCompany = ({ adminId }: AssignUnAssignCompanyProps) => {
  const [adminAssignCompany, { isLoading: assignLoading }] =
    useAdminAssignCompanyMutation();
  const [adminUnAssignCompany, { isLoading: unAssignLoading }] =
    useAdminUnAssignCompanyMutation();
  const [open, setOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState<string>("");
  const triggerSnackbar = useSnackbar();

  const handleSetAssignIdCompany = async (id: string, is_assigned: boolean) => {
    if (is_assigned) {
      handleUnassign(adminId, id);
    } else {
      setPopupOpen(id);
    }
  };

  const handleAssign = async (
    adminId: string | undefined,
    companyId: string,
    permissions: permissionsType,
  ) => {
    try {
      const res = await adminAssignCompany({
        data: {
          admin_id: adminId,
          company_id: companyId,
          permissions,
        },
      }).unwrap();
      console.log("Компания успешно назначена:", res);
      triggerSnackbar("Компания успешно назначена", "success");
    } catch (error) {
      console.error("Ошибка при назначении компании:", error);
      triggerSnackbar("Ошибка при назначении компании", "error");
    }
  };

  const handleUnassign = async (
    adminId: string | undefined,
    companyId: string,
  ) => {
    try {
      const res = await adminUnAssignCompany({
        data: {
          admin_id: adminId,
          company_id: companyId,
        },
      }).unwrap();
      console.log("Компания успешно удалена у админа:", res);
      triggerSnackbar("Компания успешно удалена у админа:", "success");
    } catch (error) {
      console.error("Ошибка при удалении компании у админа:", error);
      triggerSnackbar("Ошибка при удалении компании у админа:", "error");
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
      {(assignLoading || unAssignLoading) && <Loading />}

      <GetAllCompany
        handleSetAssignIdCompany={handleSetAssignIdCompany}
        adminId={adminId}
        parent="Admin"
      />
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

      <PermissionsPopup
        onClose={() => setPopupOpen("")}
        onAssign={handleAssign}
        adminId={adminId}
        companyId={isPopupOpen}
      />

      {open && (
        <GetAllCompany
          handleSetAssignIdCompany={handleSetAssignIdCompany}
          adminId={adminId}
          parent="Company"
        />
      )}
    </Paper>
  );
};

export default AssignUnAssignCompany;
