import React, { useState } from "react";
import UniversalTable from "../../../components/UniversalTable/UniversalTable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  useDeleteDeliveryUserMutation,
  useGetAllDeliveryUsersQuery,
} from "../../../app/api/deliverySlice";
import { useNavigate } from "react-router";
import { Box, Pagination, PaginationItem, Stack } from "@mui/material";

const UserTable = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetAllDeliveryUsersQuery({
    page: currentPage,
    limit: 15,
    search,
  });
  const [deleteUser] = useDeleteDeliveryUserMutation();

  const handleDelete = async (id: string) => {
    await deleteUser(id).unwrap();
  };

  const handleView = (id: string) => {
    navigate(id); // Placeholder, replace with navigation logic
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setCurrentPage(newPage);
  };

  const columns = [
    { field: "_id", headerName: "ID" },
    { field: "telegram_name", headerName: "имя телеграм" },
    { field: "telegram_username", headerName: "телеграм user" },
    { field: "phone", headerName: "Телефон" },
    { field: "can_order", headerName: "Может заказывать" },
    { field: "is_admin", headerName: "Администратор" },
    { field: "is_blocked", headerName: "Заблокирован" },
  ];

  return (
    <Box>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Поиск пользователей"
        style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
      />
      <UniversalTable
        title="Список пользователей"
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
    </Box>
  );
};

export default UserTable;
