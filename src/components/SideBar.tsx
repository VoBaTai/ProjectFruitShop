import React from "react";
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link
        to="/admin/"
        className="brand-link"
        style={{ textDecoration: "none" }}
      >
        <span className="brand-text font-weight-light">Fruit Shop Admin</span>
      </Link>
      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column">
            <li className="nav-item">
              <Link to="/admin/" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/product" className="nav-link">
                <i className="nav-icon fas fa-apple-alt"></i>
                <p>Products</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/customer" className="nav-link">
                <i className="nav-icon fas fa-users"></i>
                <p>Customers</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/orders" className="nav-link">
                <i className="fas fa-shopping-cart nav-icon"></i>
                <p>Orders</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
