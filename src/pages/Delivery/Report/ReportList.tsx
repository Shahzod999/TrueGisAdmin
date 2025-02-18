import { useGetAllReportsQuery } from "../../../app/api/deliverySlice";
import UniversalTable from "../../../components/UniversalTable/UniversalTable";
import { Box, Stack, Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate, useSearchParams } from "react-router";
import useSnackbar from "../../../app/hook/callSnackBar";

const ReportList = () => {
  const triggerSnackbar = useSnackbar();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); //тут
  const initialPage = Number(searchParams.get("page")) || 1;

  const { data, isLoading, isFetching } = useGetAllReportsQuery({
    page: initialPage,
    limit: 15,
  });

  const handleDelete = async (id: string) => {
    try {
      console.log(id);
      triggerSnackbar("Отчет успешно удален", "success");
    } catch (error) {
      triggerSnackbar("Произошла ошибка при удалении отчета", "error");
    }
  };
  const handleView = (id: string) => {
    navigate(id);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setSearchParams({ page: newPage.toString() });
  };

  const columns = [
    { field: "report_name", headerName: "Название отчета" },
    { field: "created_at", headerName: "Дата создания" },
    { field: "status", headerName: "Статус" },
    { field: "author.name", headerName: "Автор" },
  ];

  return (
    <div>
      <UniversalTable
        title="Отчеты"
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
    </div>
  );
};

export default ReportList;
