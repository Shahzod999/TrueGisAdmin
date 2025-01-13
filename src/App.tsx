import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import SecurePages from "./pages/SecurePages/SecurePages";
import Home from "./pages/Home/Home";
import AddUser from "./components/AddUser/AddUser";
import GetAllData from "./pages/Home/GetAllData";
import SinglePage from "./pages/SinglePage/SinglePage";

const App = () => {
  return (
    <Routes>
      <Route element={<SecurePages />}>
        <Route path="/" element={<Home />}>
          <Route index element={<GetAllData />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path=":id" element={<SinglePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
