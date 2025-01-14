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
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  useGetAllUserQuery,
  useDeleteUserMutation,
} from "../../app/api/companySlice";
import { ErrorType, userTypeData } from "../../app/types/userType";
import useSnackbar from "../../app/hook/callSnackBar";
import { useNavigate } from "react-router";

const GetAllData = () => {
  const navigate = useNavigate();
  const triggerSnackbar = useSnackbar();

  const { data, isLoading, isError, error } = useGetAllUserQuery({});
  const [deleteUser] = useDeleteUserMutation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDelete = async (id: string) => {
    try {
      await deleteUser({ id }).unwrap();
      triggerSnackbar("Пользователь успешно удален", "success");
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "data" in error &&
        "message" in (error as any).data
      ) {
        triggerSnackbar((error as ErrorType).data.message, "error");
      } else {
        triggerSnackbar("Произошла неизвестная ошибка", "error");
      }
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography
        color="error"
        variant="h6"
        sx={{ textAlign: "center", marginTop: "2rem" }}>
        Ошибка загрузки данных: {error && JSON.stringify(error)}
      </Typography>
    );
  }

  return (
    <Box p={2}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: "1rem" }}>
        Пользователи
      </Typography>
      {isMobile ? (
        // Mobile-friendly card view
        <Box>
          {data?.data.map((user: userTypeData) => (
            <Paper
              key={user._id}
              sx={{
                mb: 2,
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}>
              <Typography variant="body1">
                <strong>ID:</strong> {user._id}
              </Typography>
              <Typography variant="body1">
                <strong>Полное имя:</strong> {user.full_name}
              </Typography>
              <Typography variant="body1">
                <strong>Имя пользователя:</strong> {user.username}
              </Typography>
              <Typography variant="body1">
                <strong>Дата создания:</strong>{" "}
                {new Date(user.created_at).toLocaleDateString()}
              </Typography>
              <Box mt={1} display="flex" justifyContent="space-between">
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => navigate(user._id)}>
                  Подробнее
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(user._id)}>
                  Удалить
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        // Desktop-friendly table view
        <TableContainer
          component={Paper}
          sx={{
            marginTop: "1rem",
          }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Полное имя</TableCell>
                <TableCell>Имя пользователя</TableCell>
                <TableCell>Дата создания</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.map((user: userTypeData) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => navigate(user._id)}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.full_name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(user._id);
                      }}>
                      Удалить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {data?.data.length === 0 && (
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            padding: "1rem",
          }}>
          Нет данных для отображения
        </Typography>
      )}
    </Box>
  );
};

export default GetAllData;
