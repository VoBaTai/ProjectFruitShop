import { Routes, Route } from "react-router-dom"; // Không cần import Router nữa
import Home from "./Home";
import Contact from "./Contact";
import Shop from "./Shop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Team from "./Team";
import Cart from "./Cart";
import Detail from "./Detail";
import ShopDetail from "./ShopDetail";

function User() {
  return (
    <>
      <Header /> {/* Header sẽ hiển thị trên tất cả các trang */}
      <Routes>
        {/* Route mặc định để hiển thị trang Home khi vào địa chỉ gốc */}
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ShopDetail />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
      <Footer /> {/* Footer sẽ hiển thị trên tất cả các trang */}
    </>
  );
}

export default User;
