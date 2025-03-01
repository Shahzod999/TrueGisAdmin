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
  Box,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Loading from "../Loading";
import { CompanyTypeOne } from "../../app/types/companyType";

interface Column {
  field: string;
  headerName: string;
}

interface UniversalTableProps {
  title: string;
  data: CompanyTypeOne[] | Record<string, any>[];
  columns: Column[];
  isLoading: boolean;
  onDelete: (_id: string) => Promise<void>;
  onView: (_id: string) => void;
  handleOpenReplyModal?: (id: string) => void;
  handleSetAssignIdCompany?: (
    id: string,
    is_assigned: boolean,
  ) => Promise<void> | null;
  parent?: "Company" | "Products" | "Admin";
}

const UniversalTable: React.FC<UniversalTableProps> = ({
  title,
  data,
  columns,
  isLoading,
  onDelete,
  onView,
  handleOpenReplyModal,
  handleSetAssignIdCompany,
  parent,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getNestedValue = (obj: Record<string, any>, path: string): any => {
    const value = path
      .split(".")
      .reduce(
        (acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""),
        obj,
      );

    // Список полей, которые могут содержать временные метки
    const dateFields = ["created_at", "reply_date", "updated_at"];

    if (
      dateFields.includes(path) &&
      (typeof value === "string" || typeof value === "number")
    ) {
      const timestamp = typeof value === "string" ? parseInt(value, 10) : value;

      // Проверяем, корректен ли timestamp, и только затем преобразуем в дату
      if (!isNaN(timestamp)) {
        return new Date(timestamp).toLocaleDateString("ru-RU", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    }

    return value;
  };

  if (!data || data.length === 0) {
    return isLoading ? (
      <Loading />
    ) : (
      <Typography align="center" variant="body1">
        Нет данных для отображения.
      </Typography>
    );
  }

  const handleDelete = async (_id: string) => {
    await onDelete(_id);
  };

  // Стили для hover-эффекта
  const hoverStyles = {
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#f5f5f5",
      cursor: "pointer",
    },
  };

  return (
    <Box p={2}>
      {isLoading && <Loading />}
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>

      {isMobile ? (
        // Мобильная версия — отображаем карточки
        <Box>
          {data.map((row, index) => (
            <Paper
              key={row._id || index}
              // При клике на карточку вызываем onView
              onClick={() => onView(row._id)}
              sx={{
                mb: 2,
                p: 2,
                display: "flex",
                flexDirection: "column",
                background: row.status === "approved" ? "#e8f5e9" : "",
                ...hoverStyles,
              }}>
              {columns.map((col) => (
                <Typography key={col.field} variant="body1" sx={{ mb: 1 }}>
                  <strong>{col.headerName}:</strong>{" "}
                  {getNestedValue(row, col.field)}
                </Typography>
              ))}

              {/* Блок с кнопками. Останавливаем всплытие клика, 
                  чтобы onClick по карточке не сработал при нажатии на кнопку */}
              <Box
                mt={1}
                display="flex"
                justifyContent="space-between"
                onClick={(e) => e.stopPropagation()}>
                {handleOpenReplyModal && (
                  <Button
                    variant="outlined"
                    color="success"
                    size="small"
                    onClick={() => handleOpenReplyModal(row._id)}>
                    Ответить
                  </Button>
                )}

                {handleSetAssignIdCompany && (
                  <Button
                    variant="outlined"
                    color={row.is_assigned ? "warning" : "success"}
                    size="small"
                    onClick={() =>
                      handleSetAssignIdCompany(row._id, row.is_assigned)
                    }>
                    {row.is_assigned ? "Развязать" : "Связать"}
                  </Button>
                )}

                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => onView(row._id)}>
                  Подробнее
                </Button>

                {parent !== "Products" && (
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(row._id)}>
                    Удалить
                  </Button>
                )}
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        // Десктопная версия — отображаем таблицу
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.field}>{col.headerName}</TableCell>
                ))}
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={row._id || index}
                  // При клике на всю строку — onView
                  onClick={() => onView(row._id)}
                  sx={{
                    background: row.status === "approved" ? "#e8f5e9" : "",
                    ...hoverStyles,
                  }}>
                  {columns.map((col) => (
                    <TableCell key={col.field}>
                      {getNestedValue(row, col.field)}
                    </TableCell>
                  ))}

                  {/* Ячейка с кнопками. Останавливаем всплытие клика для строк, 
                      чтобы клик на кнопку не вызывал onClick строки */}
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    {handleOpenReplyModal && (
                      <Button
                        variant="outlined"
                        color="success"
                        size="small"
                        sx={{ margin: "5px" }}
                        onClick={() => handleOpenReplyModal(row._id)}>
                        Ответить
                      </Button>
                    )}
                    {handleSetAssignIdCompany && (
                      <Button
                        variant="outlined"
                        color={row.is_assigned ? "warning" : "success"}
                        size="small"
                        sx={{ margin: "5px", fontWeight: "bold" }}
                        onClick={() =>
                          handleSetAssignIdCompany(row._id, row.is_assigned)
                        }>
                        {row.is_assigned ? "Развязать" : "Связать"}
                      </Button>
                    )}

                    <Button
                      variant="outlined"
                      color="info"
                      size="small"
                      sx={{ margin: "5px" }}
                      onClick={() => onView(row._id)}>
                      Подробнее
                    </Button>

                    {parent !== "Products" && (
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{ margin: "5px" }}
                        onClick={() => handleDelete(row._id)}>
                        Удалить
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default UniversalTable;
