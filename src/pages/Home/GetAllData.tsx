import React from "react";
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
import useSnackbar from "../../app/types/callSnackBar";

const GetAllData: React.FC = () => {
  const triggerSnackbar = useSnackbar();

  const { data, isLoading, isError, error } = useGetAllUserQuery({});
  const [deleteUser] = useDeleteUserMutation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteUser({ id }).unwrap();
      console.log(res);
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
    <>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: "2rem",
          overflowX: isMobile ? "auto" : "initial",
        }}>
        <Table size={isMobile ? "small" : "medium"}>
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
                  "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
                }}>
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
                    onClick={() => handleDelete(user._id)}>
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
      </TableContainer>
    </>
  );
};

export default GetAllData;
