import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./firebase-config";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import reportWebVitals from "./reportWebVitals";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AdminPage from "./AdminPage";
import User from "./User";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <Routes>
        <Route path="/*" element={<User />} /> {/* Trang User */}
        <Route path="/admin/*" element={<AdminPage />} /> {/* Trang Admin */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
