import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contextapi/contextapi";
import { toast } from "react-toastify";

const Header = () => {
  const [auth, setAuth] = useAuth();

  const handlelogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully!");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="#">
            {" "}
            R.O STORE
          </a>
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                CATEGORY
              </NavLink>
            </li>

            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    REGISTER
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    LOGIN
                  </NavLink>
                </li>
              </>
            ) : (
              <>

<li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {auth?.user?.name}
        </a>
        <div class="dropdown-menu" id="mr-2" aria-labelledby="navbarDropdown">
          <NavLink class="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>Dashboard</NavLink>
        <br></br>
          <NavLink class="dropdown-item"                               
            onClick={handlelogout}
            to="/login"
>LOGOUT</NavLink>

          {/* <div class="dropdown-divider"></div> */}
        </div>
      </li>




            
              </>
            )}

            <li className="nav-item">
              <a
                className="nav-link disabled"
                href="#"
                tabindex="-1"
                aria-disabled="true"
              >
                CART (0)
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
