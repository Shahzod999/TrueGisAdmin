import React, { useState } from "react";
import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import { useReplyToOneCommentMutation } from "../../../app/api/deliverySlice";
import useSnackbar from "../../../app/hook/callSnackBar";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxWidth: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: "8px",
};

interface AddReplyCommentProps {
  commentId: string | null;
  handleClose: () => void;
}

const AddReplyComment: React.FC<AddReplyCommentProps> = ({
  handleClose,
  commentId,
}) => {
  const [reply, setReply] = useState("");
  const triggerSnackbar = useSnackbar();
  const [replyToOneComment, { isLoading }] = useReplyToOneCommentMutation();

  const handleSubmit = async () => {
    if (!reply.trim()) return alert("Reply cannot be empty");

    try {
      await replyToOneComment({ id: commentId, data: { reply } }).unwrap();
      triggerSnackbar("Успешно комментарий оставлен", "success");
      setReply("");
      handleClose();
    } catch (error) {
      triggerSnackbar("Ошибка при комментарии", "error");
    }
  };

  return (
    <Modal
      open={commentId !== null}
      onClose={handleClose}
      aria-labelledby="modal-reply-title"
      aria-describedby="modal-reply-description">
      <Box sx={style}>
        <Typography
          id="modal-reply-title"
          variant="h6"
          component="h2"
          gutterBottom>
          Add Reply
        </Typography>
        <TextField
          id="reply-input"
          label="Your Reply"
          variant="outlined"
          fullWidth
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          disabled={isLoading}
          multiline
          rows={4}
          margin="normal"
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            onClick={handleClose}
            color="secondary"
            disabled={isLoading}
            sx={{ marginRight: 2 }}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddReplyComment;
