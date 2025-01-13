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
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useGetAllUserQuery } from "../../app/api/companySlice";
import { userTypeData } from "../../app/types/userType";
import { useNavigate } from "react-router-dom";

const GetAllData: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetAllUserQuery({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Проверяем ширину экрана

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
    <TableContainer
      component={Paper}
      sx={{
        marginTop: "2rem",
        overflowX: isMobile ? "auto" : "initial", // Горизонтальная прокрутка для мобильных
      }}>
      <Table size={isMobile ? "small" : "medium"}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Полное имя</TableCell>
            <TableCell>Имя пользователя</TableCell>
            <TableCell>Дата создания</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map((user: userTypeData) => (
            <TableRow
              key={user._id}
              sx={{
                "&:hover": { backgroundColor: "#f5f5f5", cursor: "pointer" },
              }}
              onClick={() => navigate(`/${user._id}`)} // Используем navigate для перехода
            >
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.full_name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>
                {new Date(user.created_at).toLocaleDateString()}
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
  );
};

export default GetAllData;
