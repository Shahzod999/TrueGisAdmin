import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import SecurePages from "./pages/SecurePages/SecurePages";
import Home from "./pages/Home/Home";
import AddUser from "./pages/Home/AddUser";
import GetAllData from "./pages/Home/GetAllData";
import SinglePage from "./pages/Home/SinglePage/SinglePage";
import DeliveryPages from "./pages/Delivery/DeliveryPages";
import Company from "./pages/Delivery/Company/Company";
import Admin from "./pages/Delivery/Admin/Admin";
import Comments from "./pages/Delivery/Comments/Comments";
import GetSingleAdmin from "./pages/Delivery/Admin/GetSingleAdmin";
import GetAllAdmin from "./pages/Delivery/Admin/GetAllAdmin";
import AddNewAdmin from "./pages/Delivery/Admin/AddNewAdmin";

const App = () => {
  return (
    <Routes>
      <Route element={<SecurePages />}>
        <Route path="/" element={<Home />}>
          <Route index element={<GetAllData />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path=":id" element={<SinglePage />} />
        </Route>
        <Route path="delivery" element={<DeliveryPages />}>
          <Route path="company" element={<Company />} />
          <Route path="admin" element={<Admin />}>
            <Route index element={<GetAllAdmin />} />
            <Route path=":id" element={<GetSingleAdmin />} />
            <Route path="add-newAdmin" element={<AddNewAdmin />} />
          </Route>
          <Route path="comments" element={<Comments />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
