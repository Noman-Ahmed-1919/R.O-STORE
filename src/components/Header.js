import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contextapi/contextapi";
import { toast } from "react-toastify";
import Searchinput from "./Searchinput";
import useCategories from "../hooks/useCategories";
import { useCart } from "../contextapi/cart";
import {Badge} from "antd"

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] =useCart()
  const categories = useCategories();
  console.log(categories);

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
      <nav className="navbar navbar-expand-lg navbar-dark bg-maroon" style={{ backgroundColor: 'teal' }}>
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
            <Searchinput />
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                to={"/categories"}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Categories
              </a>

              <div
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link class="dropdown-item" to={"/categories"}>
                All Categories
                </Link>
                {categories?.map((c) => (
                  <Link class="dropdown-item" to={`/category/${c.slug}`}>
                    {c.name}
                  </Link>
                ))}
              </div>
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
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {auth?.user?.name}
                  </a>
                  <div
                    class="dropdown-menu"
                    id="mr-2"
                    aria-labelledby="navbarDropdown"
                  >
                    <NavLink
                      class="dropdown-item"
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                    >
                      Dashboard
                    </NavLink>
                    <br></br>
                    <NavLink
                      class="dropdown-item"
                      onClick={handlelogout}
                      to="/login"
                    >
                      LOGOUT
                    </NavLink>

                    {/* <div class="dropdown-divider"></div> */}
                  </div>
                </li>
              </>
            )}

            <li className="nav-item">
              {/* <Badge count={cart?.length}> */}
              <NavLink
                className="nav-link"
                tabindex="-1"
                aria-disabled="true"
                to="/cart"

              >
                CART {cart?.length}
              </NavLink>
              {/* </Badge> */}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
