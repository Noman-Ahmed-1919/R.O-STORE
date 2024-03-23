import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
// import { useCart } from "../contextapi/cart";
import { useAuth } from "../contextapi/contextapi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contextapi/cart";
import { json, useParams } from "react-router-dom";


const Cartpage = () => {

  const [product, setProduct] = useState({});

  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();


//total price function

const totalprice = () =>{
  try{
let total = 0;
cart?.map((item) => {
  total = total + item.price;
});
return total.toLocaleString("en-US", {
  style:"currency",
  currency: "USD",
});

  } catch (error){
console.log(error);
  }
};




  //delete items
  const removecartitem = (pid) => {
    try {
      let mycart = [...cart];
      let index = mycart.findIndex((item) => item._id === pid);
      mycart.splice(index, 1);
      setCart(mycart);
      localStorage.setItem("cart", JSON.stringify(mycart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section id="main-page">
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center  p-2 mb-1">{`Hello ${
                auth?.token && auth?.user?.name
              }`}</h1>
              <h4>
                {cart?.length
                  ? `YOU HAVE ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checjout"
                    }`
                  : "Your cart is empty"}
              </h4>
            </div>
          </div>

          <div className="row">
            <div className="col-md-8">
              <h4 className="text-center">Selected Products</h4>
              {cart?.map((p) => (
                <div className="row m-2 card flex-row">
                  <div className="col-md-4">
                  <img src={`http://localhost:5000/product-photo/${p._id}`} class="card-img-top" alt={product.name}/>

                  </div>

                  <div className="col-md-8">
                    <p>{p.name}</p>
                    <p>{p.description}</p>
                    <p>{p.price}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removecartitem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-md-4 text-center">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalprice()} </h4>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cartpage;
