import React, { useEffect, useState } from "react";
import UniversalTable from "../../../components/UniversalTable/UniversalTable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  useDeleteDeliveryUserMutation,
  useGetAllDeliveryUsersQuery,
} from "../../../app/api/deliverySlice";
import { useNavigate, useSearchParams } from "react-router";
import {
  Box,
  Pagination,
  PaginationItem,
  Stack,
  TextField,
} from "@mui/material";

const UserTable = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = Number(searchParams.get("page")) || 1;
  const searchKey = searchParams.get("search") || "";

  const { data, isLoading, isFetching } = useGetAllDeliveryUsersQuery({
    page: initialPage,
    limit: 15,
    search: searchKey,
  });

  const [deleteUser] = useDeleteDeliveryUserMutation();
  const [search, setSearch] = useState(searchKey);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      // Сохраняем текущую страницу, если она уже есть в параметрах
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set("search", search);
        return params;
      });
    }, 500); // Дебаунс 500мс для оптимизации запросов

    return () => clearTimeout(delayDebounce);
  }, [search, setSearchParams]);

  const handleDelete = async (id: string) => {
    await deleteUser(id).unwrap();
  };

  const handleView = (id: string) => {
    navigate(id); // Placeholder, replace with navigation logic
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setSearchParams({ page: newPage.toString(), search });
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
      <Box padding={"10px 5%"}>
        <TextField
          label="Поиск пользователей"
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearchChange}
        />
      </Box>

      <UniversalTable
        title="Список пользователей"
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
            page={initialPage}
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
