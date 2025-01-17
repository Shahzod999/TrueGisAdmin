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

interface Column {
  field: string;
  headerName: string;
}
//
interface UniversalTableProps {
  title: string;
  data: Array<Record<string, any>>;
  columns: Column[];
  isLoading: boolean;
  onDelete: (_id: string) => Promise<void>;
  onView: (_id: string) => void;
  handleOpenReplyModal?: (id: string) => void;
}

const UniversalTable: React.FC<UniversalTableProps> = ({
  title,
  data,
  columns,
  isLoading,
  onDelete,
  onView,
  handleOpenReplyModal,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getNestedValue = (obj: Record<string, any>, path: string): any => {
    return path
      .split(".")
      .reduce(
        (acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""),
        obj,
      );
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!data || data.length === 0) {
    return (
      <Typography align="center" variant="body1">
        Нет данных для отображения.
      </Typography>
    );
  }

  const handleDelete = async (_id: string) => {
    await onDelete(_id);
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      {isMobile ? (
        <Box>
          {data.map((row, index) => (
            <Paper
              key={row._id || index}
              sx={{ mb: 2, p: 2, display: "flex", flexDirection: "column" }}>
              {columns.map((col) => (
                <Typography key={col.field} variant="body1">
                  <strong>{col.headerName}:</strong>{" "}
                  {getNestedValue(row, col.field)}
                </Typography>
              ))}
              <Box mt={1} display="flex" justifyContent="space-between">
                {handleOpenReplyModal && (
                  <Button
                    variant="outlined"
                    color="success"
                    size="small"
                    onClick={() => handleOpenReplyModal(row._id)}>
                    Ответить
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => onView(row._id)}>
                  Подробнее
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(row._id)}>
                  Удалить
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
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
                <TableRow key={row._id || index}>
                  {columns.map((col) => (
                    <TableCell key={col.field}>
                      {getNestedValue(row, col.field)}
                    </TableCell>
                  ))}

                  <TableCell>
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

                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => onView(row._id)}
                      sx={{ margin: "5px" }}>
                      Подробнее
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      sx={{ margin: "5px" }}
                      onClick={() => handleDelete(row._id)}>
                      Удалить
                    </Button>
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
