import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  useDeleteSingleAdminMutation,
  useGetAdminDataQuery,
} from "../../../app/api/deliverySlice";
import { getAdminTypeData } from "../../../app/types/deliveryType";
import { useNavigate } from "react-router";
import useSnackbar from "../../../app/hook/callSnackBar";

const GetAllAdmin = () => {
  const navigate = useNavigate();
  const triggerSnackbar = useSnackbar();
  const [deleteSingleAdmin, { isLoading: deleteLoading }] =
    useDeleteSingleAdminMutation();

  const { data, error, isLoading } = useGetAdminDataQuery();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDeleteAdmin = async (id: string) => {
    try {
      await deleteSingleAdmin(id).unwrap();
      triggerSnackbar("Пользователь успешно удален", "success");
    } catch (error) {
      console.error("Error deleting admin:", error);
      triggerSnackbar("Произошла неизвестная ошибка", "error");
    }
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
        position="fixed"
        top={0}
        bottom={0}
        right={0}
        left={0}>
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
    <>
      <Box p={2}>
        <Typography variant="h4" gutterBottom>
          Admin Panel
        </Typography>
        {data?.data && data.data.length > 0 ? (
          isMobile ? (
            // Mobile-friendly card view
            <Box>
              {data.data.map((admin: getAdminTypeData) => (
                <Paper
                  key={admin._id}
                  sx={{
                    mb: 2,
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}>
                  <Typography variant="body1">
                    <strong>ID:</strong> {admin._id}
                    <DeleteForeverIcon
                      onClick={() => handleDeleteAdmin(admin._id)}
                    />
                  </Typography>
                  <Typography variant="body1">
                    <strong>Full Name:</strong> {admin.full_name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Username:</strong> {admin.username}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Signature:</strong> {admin.signature}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Created By:</strong> {admin.created_by}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Created At:</strong>{" "}
                    {new Date(admin.created_at).toLocaleString()}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Deleted:</strong> {admin.deleted ? "Yes" : "No"}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(admin._id);
                    }}>
                    View Details
                  </Button>
                </Paper>
              ))}
            </Box>
          ) : (
            // Desktop-friendly table view
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Signature</TableCell>
                    <TableCell>Created By</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Deleted</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.data.map((admin: getAdminTypeData) => (
                    <TableRow
                      key={admin._id}
                      onClick={() => navigate(admin._id)}
                      sx={{ cursor: "pointer" }}>
                      <TableCell>{admin._id}</TableCell>
                      <TableCell>{admin.full_name}</TableCell>
                      <TableCell>{admin.username}</TableCell>
                      <TableCell>{admin.signature}</TableCell>
                      <TableCell>{admin.created_by}</TableCell>
                      <TableCell>
                        {new Date(admin.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>{admin.deleted ? "Yes" : "No"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )
        ) : (
          <Typography align="center" variant="body1">
            No admin data available.
          </Typography>
        )}
      </Box>

      {deleteLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
          position="fixed"
          top={0}
          bottom={0}
          right={0}
          left={0}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default GetAllAdmin;
