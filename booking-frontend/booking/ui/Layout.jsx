import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../src/index.scss";
import Logo from "../public/library-book-reading-abstract-icon-or-emblem-vector.jpg"

function AppLayout() {
  return (
    <div className="layout">
      <div>
        <div className="logo--container">
          <img src={Logo} alt="My Library logo" width="100" />
          <p className="title">My Library</p>
        </div>
        <Navbar/>
      </div>
      <Outlet />
    </div>
  );
}

export default AppLayout;