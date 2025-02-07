import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="/#">
            <i className="fas fa-bars"></i>
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/admin/" className="nav-link">
            Dashboard
          </Link>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/admin/product" className="nav-link">
            Products
          </Link>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/admin/customer" className="nav-link">
            Customers
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
