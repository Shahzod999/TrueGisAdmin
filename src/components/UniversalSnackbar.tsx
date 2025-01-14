// components/UniversalSnackbar.tsx

import { useDispatch, useSelector } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { hideSnackbar } from "../app/features/snackbarSlice";
import { RootState } from "../app/store";

const UniversalSnackbar = () => {
  const dispatch = useDispatch();
  const { message, severity, open } = useSelector(
    (state: RootState) => state.snackbar,
  );

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default UniversalSnackbar;
