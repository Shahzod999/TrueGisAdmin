import { useState } from "react";
import UniversalTable from "../../../components/UniversalTable/UniversalTable";
import { Box, Stack, Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router";
import useSnackbar from "../../../app/hook/callSnackBar";
import {
  useDeleteProductsMutation,
  useGetAllProductsQuery,
} from "../../../app/api/deliverySlice";

const GetAllProducts = () => {
  const navigate = useNavigate();
  const triggerSnackbar = useSnackbar();
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteProduct] = useDeleteProductsMutation();
  const { data, isLoading, isFetching } = useGetAllProductsQuery({
    page: currentPage.toString(),
    limit: "15",
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct({ id }).unwrap();
      triggerSnackbar("Продукт успешно удален", "success");
    } catch (error) {
      triggerSnackbar("Произошла ошибка при удалении продукта", "error");
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
    { field: "category_id", headerName: "Категория ID" },
    { field: "price", headerName: "Цена" },
    { field: "company_id", headerName: "Компания ID" },
    { field: "description", headerName: "Описание" },
  ];

  return (
    <div>
      <UniversalTable
        title="Продукты"
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

export default GetAllProducts;
