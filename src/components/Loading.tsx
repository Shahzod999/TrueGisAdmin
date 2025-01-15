import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        background: "#ffffff66",
        zIndex: 999,
      }}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
