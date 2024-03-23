import { Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Policy from "./components/Policy";
import Register from "./components/Register";
import Login from "./components/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Privateroute from "./Routes/Privateroute";
import Adminroute from "./Routes/Adminroute";

import Forgot from "./components/Forgot";
import Admindashboard from "./components/admin/Admindashboard";
import Createcategory from "./components/Createcategory";
import Users from "./components/Users";
import Createproduct from "./components/Createproduct";
import Dashboard from "./components/user/Dashboard";
import Oders from "./components/Oders";
import Profile from "./components/Profile";
import Products from "./components/Products";
import Updateproduct from "./components/Updateproduct";
import Search from "./components/Search";
import Productdetails from "./components/Productdetails";
import Categories from "./components/Categories";
import Categoryproduct from "./components/Categoryproduct";
import Cartpage from "./components/Cartpage";
import Adminorders from "./components/admin/Adminorders";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:slug" element={<Productdetails />} />
        <Route exact path="/categories" element={<Categories />} />
        <Route exact path="/cart" element={<Cartpage />} />

        <Route exact path="/category/:slug" element={<Categoryproduct />} />

        <Route exact path="/search" element={<Search />} />

        <Route path="/dashboard" element={<Privateroute />}>
          <Route exact path="user" element={<Dashboard />} />
          <Route exact path="user/orders" element={<Oders />} />
          <Route exact path="user/profile" element={<Profile />} />
        </Route>

        <Route path="/dashboard" element={<Adminroute />}>
          <Route exact path="admin" element={<Admindashboard />} />
          <Route
            exact
            path="admin/create-category"
            element={<Createcategory />}
          />
          <Route
            exact
            path="admin/create-product"
            element={<Createproduct />}
          />
          <Route exact path="admin/product/:slug" element={<Updateproduct />} />

          <Route exact path="admin/product" element={<Products />} />

          <Route exact path="admin/users" element={<Users />} />
          <Route exact path="admin/orders" element={<Adminorders />} />

        </Route>

        <Route exact path="/policy" element={<Policy />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgot-password" element={<Forgot />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
