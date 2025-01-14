import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../features/snackbarSlice";

const useSnackbar = () => {
  const dispatch = useDispatch();

  const triggerSnackbar = useCallback(
    (message: string, severity: "success" | "error" | "info" | "warning") => {
      dispatch(showSnackbar({ message, severity }));
    },
    [dispatch],
  );

  return triggerSnackbar;
};

export default useSnackbar;
