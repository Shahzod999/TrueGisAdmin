import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../../components/Header/Header";

const Home = () => {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
};

export default Home;
