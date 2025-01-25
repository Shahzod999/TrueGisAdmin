import { useNavigate } from "react-router";
import {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from "../../../app/api/deliverySlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import UniversalTable from "../../../components/UniversalTable/UniversalTable";
import { Box, Pagination, PaginationItem, Stack } from "@mui/material";
import { useState } from "react";

// List of categories
const CategoryList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetAllCategoryQuery({ page: currentPage });
  const [deleteCategory] = useDeleteCategoryMutation();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    await deleteCategory(id).unwrap();
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
    { field: "_id", headerName: "ID" },
    { field: "name", headerName: "Название категории" },
    { field: "created_by", headerName: "Создано пользователем" },
    { field: "created_at", headerName: "Дата создания" },
  ];

  return (
    <>
      <UniversalTable
        title="Список категорий"
        data={data?.data || []}
        columns={columns}
        isLoading={isLoading}
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
    </>
  );
};

export default CategoryList;
