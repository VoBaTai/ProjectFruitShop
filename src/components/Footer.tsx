import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="py-5" style={{ backgroundColor: "#e3f2fd" }}>
      <div className="container">
        <div className="row">
          {/* Cột 1: Logo và giới thiệu */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="text-uppercase mb-3" style={{ color: "#1976d2" }}>
              VegetStore
            </h5>
            <p style={{ color: "#1976d2" }}>
              Chuyên cung cấp trái cây sạch, tươi ngon. Sức khỏe của bạn là ưu
              tiên hàng đầu của chúng tôi.
            </p>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="text-uppercase mb-3" style={{ color: "#1976d2" }}>
              Liên kết nhanh
            </h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="nav-link text-dark">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/shop" className="nav-link text-dark">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/team" className="nav-link text-dark">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/contact" className="nav-link text-dark">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Liên hệ và mạng xã hội */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="text-uppercase mb-3" style={{ color: "#1976d2" }}>
              Liên hệ
            </h5>
            <p>Email: support@vegetstore.com</p>
            <p>Hotline: 0123 456 789</p>
            <div className="d-flex">
              <a href="/#" className="text-dark me-3">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="/#" className="text-dark me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="/#" className="text-dark me-3">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="/#" className="text-dark">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        <hr style={{ backgroundColor: "#1976d2" }} />

        <div className="row">
          <div className="col-lg-12 text-center">
            <p className="m-0" style={{ color: "#1976d2" }}>
              &copy; 2023 VegetStore. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
