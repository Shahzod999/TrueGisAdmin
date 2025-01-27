import React, { useState } from "react";
import {
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
} from "../../../app/api/deliverySlice";
import UniversalTable from "../../../components/UniversalTable/UniversalTable";
import { Box, Stack, Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router";
import useSnackbar from "../../../app/hook/callSnackBar";
import { useParams } from "react-router";

const OrderList = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const triggerSnackbar = useSnackbar();
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteOrder] = useDeleteOrderMutation();
  const { data, isLoading, isFetching } = useGetAllOrdersQuery({
    page: currentPage,
    limit: 16,
    company_id: companyId,
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteOrder({ id }).unwrap();
      triggerSnackbar("Заказ успешно удален", "success");
    } catch (error) {
      triggerSnackbar("Ошибка при удалении заказа", "error");
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
    { field: "order_number", headerName: "Номер заказа" },
    { field: "customer_name", headerName: "Имя клиента" },
    { field: "status", headerName: "Статус" },
    { field: "total_amount", headerName: "Сумма заказа" },
    { field: "created_at", headerName: "Дата создания" },
  ];
  console.log(companyId);

  return (
    <div>
      <UniversalTable
        title="Заказы"
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

export default OrderList;
