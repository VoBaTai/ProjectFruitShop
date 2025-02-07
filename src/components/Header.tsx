import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SignUp from "./SignUp";
import LoginUser from "./LoginUser";

const Header: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra trạng thái đăng nhập khi component được tải lại
  useEffect(() => {
    const userUid = localStorage.getItem("userUid"); // Lấy UID từ localStorage
    if (userUid) {
      setIsLoggedIn(true); // Nếu có UID, nghĩa là đã đăng nhập
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userUid"); // Xóa UID khỏi localStorage khi đăng xuất
    setIsLoggedIn(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container px-4 px-lg-5">
          <Link className="navbar-brand" to="/">
            <img
              src="./images/VegetStore.png"
              alt="VegetStore"
              style={{ height: "40px" }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/team">
                  Team
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop">
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <div className="input-group me-3" style={{ width: "300px" }}>
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                  />
                  <button type="button" className="btn btn-primary">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </li>
            </ul>
            <form className="d-flex align-items-center">
              <Link
                to="/cart"
                className="btn btn-outline-success d-flex align-items-center"
              >
                <i className="bi-cart-fill me-1"></i> Cart
              </Link>
            </form>
            {!isLoggedIn ? (
              <>
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => setShowLogin(true)}
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  Login
                </button>
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => setShowSignUp(true)}
                  data-bs-toggle="modal"
                  data-bs-target="#signUpModal"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button className="btn btn-danger mx-2" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <div
        className="modal fade"
        id="loginModal"
        tabIndex={-1}
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">
                Login
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowLogin(false)}
              ></button>
            </div>
            <div className="modal-body">
              <LoginUser onClose={handleLogin} />
            </div>
          </div>
        </div>
      </div>

      {/* Sign Up Modal */}
      <div
        className="modal fade"
        id="signUpModal"
        tabIndex={-1}
        aria-labelledby="signUpModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="signUpModalLabel">
                Sign Up
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowSignUp(false)}
              ></button>
            </div>
            <div className="modal-body">
              <SignUp onClose={() => setShowSignUp(false)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
