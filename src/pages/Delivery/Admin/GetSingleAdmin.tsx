import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  useDeleteSingleAdminMutation,
  useGetSingleAdminQuery,
  useUpdateSingleAdminMutation,
} from "../../../app/api/deliverySlice";

const GetSingleAdmin = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetSingleAdminQuery({ id });
  const [updateAdmin] = useUpdateSingleAdminMutation();
  const [deleteSingleAdmin] = useDeleteSingleAdminMutation();

  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState({
    full_name: "",
    username: "",
  });

  const handleOpenEditDialog = () => {
    if (data) {
      setEditData({
        full_name: data.full_name,
        username: data.username,
      });
      setEditDialogOpen(true);
    }
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleUpdateAdmin = async () => {
    try {
      await updateAdmin({ id, ...editData });
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  const handleDeleteAdmin = async () => {
    try {
      await deleteSingleAdmin({ id });
      navigate("/delivery/admin"); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" variant="h6">
        Error: {(error as any).data?.message || "Something went wrong"}
      </Typography>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Admin Details
      </Typography>
      {data ? (
        <Box>
          <Typography variant="body1">
            <strong>ID:</strong> {data._id}
          </Typography>
          <Typography variant="body1">
            <strong>Full Name:</strong> {data.full_name}
          </Typography>
          <Typography variant="body1">
            <strong>Username:</strong> {data.username}
          </Typography>
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenEditDialog}>
              Edit Admin
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteAdmin}
              sx={{ ml: 2 }}>
              Delete Admin
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography variant="body1">No admin data available.</Typography>
      )}

      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Admin</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the admin details and save changes.
          </DialogContentText>
          <TextField
            margin="dense"
            label="Full Name"
            fullWidth
            value={editData.full_name}
            onChange={(e) =>
              setEditData({ ...editData, full_name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Username"
            fullWidth
            value={editData.username}
            onChange={(e) =>
              setEditData({ ...editData, username: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button
            onClick={handleUpdateAdmin}
            color="primary"
            variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GetSingleAdmin;
