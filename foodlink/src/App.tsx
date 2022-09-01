import { Route, Routes } from "react-router-dom";
import { NotFound, PrivateRoute } from "./components/Common";
import { AdminLayout, VanDetail } from "./components/Layout";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { RegistrationPage } from "./features/auth/pages/RegistrationPage";
import { AddProduct } from "./components/Layout/AddProduct";
import "antd/dist/antd.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/admin" element={<PrivateRoute />}>
          <Route path=":id" element={<VanDetail />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="" element={<AdminLayout />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
