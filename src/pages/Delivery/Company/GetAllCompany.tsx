import React, { useState } from "react";
import {
  useDeleteCompanyMutation,
  useGetAllCompanyQuery,
} from "../../../app/api/deliverySlice";
import UniversalTable from "../../../components/UniversalTable/UniversalTable";
import { Box, Stack, Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router";
import useSnackbar from "../../../app/hook/callSnackBar";

const GetAllCompany = () => {
  const navigate = useNavigate();
  const triggerSnackbar = useSnackbar();
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteCompany] = useDeleteCompanyMutation();
  const { data, isLoading, isFetching } = useGetAllCompanyQuery({
    page: currentPage,
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

  const columns = [
    { field: "name", headerName: "Название" },
    { field: "city", headerName: "Город" },
    { field: "country", headerName: "Страна" },
    { field: "phone_number", headerName: "Телефон" },
    { field: "full_address", headerName: "Адрес" },
  ];

  return (
    <div>
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
