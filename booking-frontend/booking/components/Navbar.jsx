import { NavLink } from "react-router-dom";

function Navbar() {

    return (<div className="navbar">
      <NavLink to="/books" className={({ isActive }) => (isActive ? "navbar--link navbar--active" : "navbar--link")}>Books</NavLink>
      <NavLink to="/users" className={({ isActive }) => (isActive ? "navbar--link navbar--active" : "navbar--link")}>Users</NavLink>
    </div>)
  }
  
  export default Navbar;