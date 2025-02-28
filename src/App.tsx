import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import SecurePages from "./pages/SecurePages/SecurePages";
import Home from "./pages/Home/Home";
import AddUser from "./pages/Home/AddUser";
import GetAllData from "./pages/Home/GetAllData";
import SinglePage from "./pages/Home/SinglePage/SinglePage";
import Company from "./pages/Delivery/Company/Company";
import Admin from "./pages/Delivery/Admin/Admin";
import Comments from "./pages/Delivery/Comments/Comments";
import GetSingleAdmin from "./pages/Delivery/Admin/GetSingleAdmin";
import GetAllAdmin from "./pages/Delivery/Admin/GetAllAdmin";
import AddNewAdmin from "./pages/Delivery/Admin/AddNewAdmin";
import GetAllCompany from "./pages/Delivery/Company/GetAllCompany";
import CompanySinglePage from "./pages/Delivery/Company/CompanySinglePage";
import AddNewCompany from "./pages/Delivery/Company/AddNewCompany";
import GetAllComments from "./pages/Delivery/Comments/GetAllComments";
import CommentSinglePage from "./pages/Delivery/Comments/CommentSinglePage";
import Types from "./pages/Delivery/Types/Types";
import TypeList from "./pages/Delivery/Types/TypeList";
import AddTypeForm from "./pages/Delivery/Types/AddTypeForm";
import TypeDetails from "./pages/Delivery/Types/TypeDetails";
import User from "./pages/Delivery/User/User";
import UserDetails from "./pages/Delivery/User/UserDetails";
import UserTable from "./pages/Delivery/User/UserTable";
import UpdateCompany from "./pages/Delivery/UpdateCompany/UpdateCompany";
import UpdateCompanySinglePage from "./pages/Delivery/UpdateCompany/UpdateCompanySinglePage";
import GetAllUpdateCompany from "./pages/Delivery/UpdateCompany/GetAllUpdateCompany";
import Categories from "./pages/Delivery/Categories/Categories";
import AddNewCategory from "./pages/Delivery/Categories/AddNewCategory";
import CategoryList from "./pages/Delivery/Categories/CategoryList";
import CategoryDetails from "./pages/Delivery/Categories/CategoryDetails";
import Products from "./pages/Delivery/Products/Products";
import ProductsList from "./pages/Delivery/Products/ProductsList";
import ProductsDetails from "./pages/Delivery/Products/ProductsDetails";
import AddNewProducts from "./pages/Delivery/Products/AddNewProducts";
import Report from "./pages/Delivery/Report/Report";
import Orders from "./pages/Delivery/Orders/Orders";
import ReportSingle from "./pages/Delivery/Report/ReportSingle";
import ReportList from "./pages/Delivery/Report/ReportList";
import OrderList from "./pages/Delivery/Orders/OrderList";
import OrderSingle from "./pages/Delivery/Orders/OrderSingle";

const App = () => {
  return (
    <Routes>
      <Route element={<SecurePages />}>
        <Route path="/" element={<Home />}>
          <Route index element={<GetAllData />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path=":id" element={<SinglePage />} />

          <Route path="delivery-company" element={<UpdateCompany />}>
            <Route index element={<GetAllCompany parent="Company" />} />
            <Route path=":id" element={<CompanySinglePage />} />
            <Route path="add-newCompany" element={<AddNewCompany />} />
          </Route>
          <Route path="delivery-updateCompany" element={<Company />}>
            <Route index element={<GetAllUpdateCompany />} />
            <Route path=":id" element={<UpdateCompanySinglePage />} />
          </Route>
          <Route path="delivery-admin" element={<Admin />}>
            <Route index element={<GetAllAdmin />} />
            <Route path=":id" element={<GetSingleAdmin />} />
            <Route path="add-newAdmin" element={<AddNewAdmin />} />
          </Route>
          <Route path="delivery-comments" element={<Comments />}>
            <Route index element={<GetAllComments />} />
            <Route path=":id" element={<CommentSinglePage />} />
          </Route>
          <Route path="delivery-types" element={<Types />}>
            <Route index element={<TypeList />} />
            <Route path=":id" element={<TypeDetails />} />
            <Route path="add-newTypes" element={<AddTypeForm />} />
          </Route>
          <Route path="delivery-user" element={<User />}>
            <Route index element={<UserTable />} />
            <Route path=":id" element={<UserDetails />} />
          </Route>
          <Route path="delivery-categories/:companyId" element={<Categories />}>
            <Route index element={<CategoryList />} />
            <Route path=":id" element={<CategoryDetails />} />
            <Route path="add-categories" element={<AddNewCategory />} />
          </Route>
          <Route path="delivery-products/:companyId" element={<Products />}>
            <Route index element={<ProductsList />} />
            <Route path=":id" element={<ProductsDetails />} />
            <Route path="add-newProduct" element={<AddNewProducts />} />
          </Route>
          <Route path="delivery-report" element={<Report />}>
            <Route index element={<ReportList />} />
            <Route path=":id" element={<ReportSingle />} />
          </Route>
          <Route path="delivery-orders/:companyId" element={<Orders />}>
            <Route index element={<OrderList />} />
            <Route path=":id" element={<OrderSingle />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
