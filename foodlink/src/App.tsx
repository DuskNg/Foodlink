import { Route, Routes } from "react-router-dom";
import { NotFound, PrivateRoute } from "./components/Common";
import { AdminLayout, VanDetail } from "./components/Layout";
import { LoginPage } from "./features/auth/pages/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { RegistrationPage } from "./features/auth/pages/RegistrationPage";
import { AddProduct } from "./components/Layout/AddProduct";
import "antd/dist/antd.css";

// interface IRoute {
//   path: string;
//   element: () => JSX.Element;
// }

function App() {
  // const routesArr: IRoute[] = [
  //   {
  //     path: "/",
  //     element: LoginPage,
  //   },
  //   {
  //     path: "/register",
  //     element: RegistrationPage,
  //   },
  //   {
  //     path: "/admin",
  //     element: PrivateRoute,
  //   },
  //   {
  //     path: "/admin/:id",
  //     element: VanDetail,
  //   },
  //   {
  //     path: "/admin/add",
  //     element: AddProduct,
  //   },
  // ];

  return (
    <>
      <Routes>
        {/* {routesArr.map((route) => (
          <Route key={route.path} path={route.path} element={route.element()} />
        ))} */}
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
