import React, { useState } from "react";
import {
  useDeleteUpdateCompanyMutation,
  useGetUpdateCompanyQuery,
} from "../../../app/api/deliverySlice";
import UniversalTable from "../../../components/UniversalTable/UniversalTable";
import { Box, Stack, Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useNavigate, useSearchParams } from "react-router";
import useSnackbar from "../../../app/hook/callSnackBar";
import Loading from "../../../components/Loading";
import DropDownSelect from "../../../components/DropDownSelect/DropDownSelect";
import { UpdateCompanyType } from "../../../app/types/UpdateCompanyTypes";

const GetAllUpdateCompany = () => {
  const navigate = useNavigate();
  const triggerSnackbar = useSnackbar();
  const [searchParams, setSearchParams] = useSearchParams(); //тут
  const initialPage = Number(searchParams.get("page")) || 1;

  const [filterStatus, setFilterStatus] = useState("all");

  const [deleteCompany] = useDeleteUpdateCompanyMutation();
  const { data, isLoading, isFetching } = useGetUpdateCompanyQuery({
    page: initialPage,
  });

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setSearchParams({ page: newPage.toString() });
  };

  const handleView = (id: string) => {
    navigate(id);
  };
  const handleDelete = async (id: string) => {
    try {
      let res = await deleteCompany(id).unwrap();

      triggerSnackbar(res?.message || "Данные успешно удалены!", "success");
    } catch (error: any) {
      console.log(error);
      triggerSnackbar(
        error.data.message || "Не удалось удалить данные",
        "error",
      );
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterStatus(e.target.value);
  };

  const columns = [
    { field: "company_id", headerName: "ID Company" },
    { field: "company.name", headerName: "Company" },
    { field: "status", headerName: "Статус" },
    { field: "updated_at", headerName: "Дата обновления" },
    { field: "requester_name", headerName: "Инициатор" },
    { field: "requester_position", headerName: "Позиция" },
  ];
  const statusOptions = [
    { _id: "all", name: "Все" },
    { _id: "approved", name: "Одобрено" },
    { _id: "pending", name: "В ожидании" },
  ];

  const filteredData =
    filterStatus === "all"
      ? data?.data || []
      : (data?.data || []).filter(
          (item: UpdateCompanyType) => item.status === filterStatus,
        );

  return (
    <div>
      {isFetching && <Loading />}
      <Box>
        <DropDownSelect
          data={statusOptions}
          selectedValue={filterStatus}
          handleChange={handleFilterChange}
          label="Фильтр по статусу"
        />
      </Box>

      <UniversalTable
        title="Запросы на обновление компаний"
        data={filteredData}
        columns={columns}
        isLoading={isLoading}
        onDelete={handleDelete} // Здесь нет функционала удаления
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
    </div>
  );
};

export default GetAllUpdateCompany;
