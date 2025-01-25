import React, { useRef, useState } from "react";
import {
  useDeleteCompanyMutation,
  useGetAllCompanyQuery,
} from "../../../app/api/deliverySlice";
import UniversalTable from "../../../components/UniversalTable/UniversalTable";
import {
  Box,
  Stack,
  Pagination,
  PaginationItem,
  Button,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router";
import useSnackbar from "../../../app/hook/callSnackBar";
import { Link } from "react-router-dom";

const GetAllCompany = () => {
  const navigate = useNavigate();
  const triggerSnackbar = useSnackbar();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const timerRef = useRef<null | ReturnType<typeof setTimeout>>(null);
  const [deleteCompany] = useDeleteCompanyMutation();

  const { data, isLoading, isFetching, refetch } = useGetAllCompanyQuery({
    page: currentPage,
    keyword: debouncedSearch,
  });

  const handleDelete = async (id: string) => {
    console.log(id);

    try {
      await deleteCompany({ id }).unwrap();
      triggerSnackbar("Пользователь успешно удален", "success");
    } catch (error) {
      triggerSnackbar("Произошла ошибка при удалении", "error");
    }
  };

  const handleView = (id: string) => {
    navigate(id);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setCurrentPage(newPage);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setDebouncedSearch(value);
      refetch();
    }, 500);
  };

  console.log(data, debouncedSearch);

  const columns = [
    { field: "name", headerName: "Название" },
    { field: "city", headerName: "Город" },
    { field: "country", headerName: "Страна" },
    { field: "phone_number", headerName: "Телефон" },
    { field: "full_address", headerName: "Адрес" },
  ];

  return (
    <div>
      <Box sx={{ textAlign: "right" }}>
        <Button
          component={Link}
          to="add-newCompany"
          color="secondary"
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#125ea8" },
          }}>
          Создать Компанию
        </Button>
      </Box>

      <Box padding={"10px 5%"}>
        <TextField
          label="Поиск компании"
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleChange}
        />
      </Box>
      <UniversalTable
        title="Компании"
        data={data?.data || []}
        columns={columns}
        isLoading={isLoading || isFetching}
        onDelete={handleDelete}
        onView={handleView}
      />
      <Box display="flex" justifyContent="center" mt={2}>
        <Stack spacing={2}>
          <Pagination
            count={data?.pagination?.totalPages || 1}
            page={currentPage}
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Stack>
      </Box>
    </div>
  );
};

export default GetAllCompany;
