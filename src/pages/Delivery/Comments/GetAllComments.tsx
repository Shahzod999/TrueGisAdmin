import React, { useState } from "react";
import {
  useDeleteOneCommentMutation,
  useDeleteOneReplyMutation,
  useGetAllCommentsQuery,
  useUpdateOneReplyMutation,
} from "../../../app/api/deliverySlice";
import UniversalTable from "../../../components/UniversalTable/UniversalTable";
import {
  Box,
  Stack,
  Pagination,
  PaginationItem,
  Typography,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router";
import AddReplyComment from "./AddReplyComment";
import Loading from "../../../components/Loading";
import useSnackbar from "../../../app/hook/callSnackBar";

const GetAllComments = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const triggerSnackbar = useSnackbar();

  const { data, isLoading, isFetching, error } = useGetAllCommentsQuery({
    page: currentPage,
  });
  const [deleteComment] = useDeleteOneCommentMutation();
  const [updateReply] = useUpdateOneReplyMutation();
  const [deleteReply] = useDeleteOneReplyMutation();

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

  const handleUpdateReply = async (
    reply_id: string,
    comment_id: string,
    updatedMessage: string,
  ) => {
    try {
      await updateReply({
        reply_id,
        comment_id,
        data: { message: updatedMessage },
      }).unwrap();
      triggerSnackbar("Успешно обновлён", "success");
    } catch (error) {
      console.error("Ошибка обновления ответа:", error);
      triggerSnackbar("Ошибка при обновлении", "error");
    }
  };

  const handleDeleteReply = async (reply_id: string, comment_id: string) => {
    try {
      await deleteReply({ reply_id, comment_id }).unwrap();
      triggerSnackbar("Успешно удалён", "success");
    } catch (error) {
      console.error("Ошибка удаления ответа:", error);
      triggerSnackbar("Ошибка при удалении", "error");
    }
  };

  const columns = [
    { field: "user.telegram_name", headerName: "Имя пользователя" },
    { field: "rating", headerName: "Рейтинг" },
    { field: "message", headerName: "Сообщение" },
    { field: "created_at", headerName: "Дата создания" },
    { field: "company.name", headerName: "Компания" },
  ];

  const [modalReply, setModalReply] = useState<string | null>(null);

  const [editingReply, setEditingReply] = useState<string | null>(null);
  const [editedMessage, setEditedMessage] = useState<string>("");

  const handleOpenReplyModal = (id: string) => {
    setModalReply(id);
  };

  const handleCloseReplyModal = () => {
    setModalReply(null);
  };

  if (isLoading) return <Loading />;
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
      {isFetching && <Loading />}
      <AddReplyComment
        commentId={modalReply}
        handleClose={handleCloseReplyModal}
      />

      {data?.data.map((comment: any) => (
        <Box key={comment._id} mb={10} sx={{ background: "#fffef6" }} p={3}>
          <UniversalTable
            title=""
            data={[comment]} // Передаём текущий комментарий как массив
            columns={columns}
            isLoading={false}
            onDelete={handleDelete}
            onView={handleView}
            handleOpenReplyModal={handleOpenReplyModal}
          />
          {comment.replies && comment.replies.length > 0 && (
            <Box mt={2}>
              {comment.replies.map((reply: any) => (
                <Paper
                  key={reply.reply_id}
                  elevation={2}
                  sx={{
                    padding: 2,
                    marginBottom: 2,
                    backgroundColor: "#fffadf",
                    width: "90%",
                    marginLeft: "auto",
                  }}>
                  {editingReply === reply.reply_id ? (
                    <>
                      <TextField
                        fullWidth
                        variant="outlined"
                        value={editedMessage}
                        onChange={(e) => setEditedMessage(e.target.value)}
                      />
                      <Box mt={2} display="flex" gap={1}>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => {
                            handleUpdateReply(
                              reply.reply_id,
                              comment._id,
                              editedMessage,
                            );
                            setEditingReply(null);
                            setEditedMessage("");
                          }}>
                          Сохранить
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => setEditingReply(null)}>
                          Отмена
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography variant="body1">
                        <strong>Сообщение:</strong> {reply.message}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Кем:</strong> {reply.reply_from}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Дата ответа:</strong>{" "}
                        {new Date(reply.reply_date).toLocaleDateString(
                          "ru-RU",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </Typography>
                      <Box mt={2} display="flex" gap={1}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            setEditingReply(reply.reply_id);
                            setEditedMessage(reply.message);
                          }}>
                          Изменить
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() =>
                            handleDeleteReply(reply.reply_id, comment._id)
                          }>
                          Удалить
                        </Button>
                      </Box>
                    </>
                  )}
                </Paper>
              ))}
            </Box>
          )}
        </Box>
      ))}
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
