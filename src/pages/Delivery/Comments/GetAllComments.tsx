import React, { useState } from "react";
import {
  useDeleteOneCommentMutation,
  useGetAllCommentsQuery,
} from "../../../app/api/deliverySlice";
import UniversalTable from "../../../components/UniversalTable/UniversalTable";
import {
  Box,
  Stack,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CommentType } from "../../../app/types/commetType";
import { useNavigate } from "react-router";

const GetAllComments = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isLoading, isFetching, error } = useGetAllCommentsQuery({
    page: currentPage,
  });
  const [deleteComment] = useDeleteOneCommentMutation();

  const handleDelete = async (id: string) => {
    try {
      let res = await deleteComment({ id }).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
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
    { field: "user.telegram_name", headerName: "Имя пользователя" },
    { field: "rating", headerName: "Рейтинг" },
    { field: "message", headerName: "Сообщение" },
    { field: "created_at", headerName: "Дата создания" },
    { field: "company.name", headerName: "Компания" },
  ];

  const formatData = (comments: CommentType[]) =>
    comments.map((comment) => ({
      _id: comment._id,
      "user.telegram_name": comment.user?.telegram_name || "Не указано",
      rating: comment.rating,
      message: comment.message,
      created_at: new Date(comment.created_at).toLocaleDateString(),
      "company.name": comment.company?.name || "Не указано",
    }));

  // Если произошла ошибка при загрузке данных
  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error" variant="h6">
          Ошибка при загрузке комментариев.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <UniversalTable
        title="Комментарии"
        data={data?.data ? formatData(data.data) : []}
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
    </Box>
  );
};

export default GetAllComments;
