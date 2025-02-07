import { Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import FooterAdmin from "./components/FooterAdmin";
import DashBoard from "./DashBoard";
import Orders from "./Orders";
import Customer from "./Customer";
import OrderDetail from "./OrderDetail";
import ProductEdit from "./ProductEdit";
import CustomerEdit from "./CustomerEdit";

function AdminPage() {
  return (
    <>
      <NavBar />
      <SideBar />
      <Routes>
        <Route path="/" element={<DashBoard />} />{" "}
        {/* Đường dẫn gốc cho trang Admin */}
        <Route path="product" element={<ProductList />} />
        <Route path="product/:id" element={<ProductEdit />} />
        <Route path="orders" element={<Orders />} />
        <Route path="customer" element={<Customer />} />
        {/* <Route path="order/detail" element={<OrderDetail />} /> */}
        <Route path="orderDetail/:orderId" element={<OrderDetail />} />
      </Routes>
      <FooterAdmin />
    </>
  );
}

export default AdminPage;
