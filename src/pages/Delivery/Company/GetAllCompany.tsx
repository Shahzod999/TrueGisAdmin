import React, { useEffect, useState } from "react";
import {
  useAdminAssignedCompanyQuery,
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
import { useNavigate, useSearchParams } from "react-router";
import useSnackbar from "../../../app/hook/callSnackBar";
import { Link } from "react-router-dom";
import { CompanyTypeOne } from "../../../app/types/companyType";
interface GetAllCompanyProps {
  handleSetAssignIdCompany?: (
    id: string,
    is_assigned: boolean,
  ) => Promise<void> | null;
  adminId?: string | undefined;
  parent: "Company" | "Admin";
  assignedCompanies?: string[];
}

const GetAllCompany = ({
  adminId,
  handleSetAssignIdCompany,
  parent,
  assignedCompanies,
}: GetAllCompanyProps) => {
  const [searchParams, setSearchParams] = useSearchParams(); //тут
  const initialPage = Number(searchParams.get("page")) || 1;
  const searchKey = searchParams.get("search") || "";

  const navigate = useNavigate();
  const triggerSnackbar = useSnackbar();

  const [search, setSearch] = useState(searchKey);

  const [deleteCompany] = useDeleteCompanyMutation();

  const { data, isLoading, isFetching } = useGetAllCompanyQuery(
    {
      page: initialPage,
      keyword: searchKey,
      admin_id: adminId,
    },
    { skip: parent == "Admin" },
  );

  const { data: asignedCompanies } = useAdminAssignedCompanyQuery(
    {
      admin_id: adminId,
    },
    { skip: parent == "Company" },
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteCompany({ id }).unwrap();
      triggerSnackbar("Пользователь успешно удален", "success");
    } catch (error) {
      triggerSnackbar("Произошла ошибка при удалении", "error");
    }
  };

  const handleView = (id: string) => {
    navigate(`/delivery-company/${id}`);
  };

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

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setSearchParams({ page: newPage.toString(), search });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const columns = [
    { field: "name", headerName: "Название" },
    { field: "city", headerName: "Город" },
    { field: "country", headerName: "Страна" },
    { field: "phone_number", headerName: "Телефон" },
    { field: "full_address", headerName: "Адрес" },
  ];

  const allCompanyAssigned = asignedCompanies?.data?.map(
    (item: CompanyTypeOne) => ({
      ...item,
      is_assigned: true,
    }),
  );

  const filteredCompanyAssigned = assignedCompanies
    ? data?.data?.filter((item: any) => !assignedCompanies?.includes(item._id))
    : data?.data;

  return (
    <div>
      {parent !== "Admin" && (
        <>
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
        </>
      )}

      <UniversalTable
        title={parent == "Admin" ? "Связанные Компании" : "Компании"}
        data={filteredCompanyAssigned || allCompanyAssigned || []}
        columns={columns}
        isLoading={isLoading || isFetching}
        onDelete={handleDelete}
        onView={handleView}
        handleSetAssignIdCompany={handleSetAssignIdCompany}
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

export default GetAllCompany;
