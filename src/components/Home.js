import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Page from "./Page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../contextapi/contextapi";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "./Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contextapi/cart";

const Home = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [Cart, setCart] = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(1);

  //getTotal count

  const getTotalcount = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadmore();
  }, [page]);

  // load more
  const loadmore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.productsofpage]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //get all categories

  const getallcategories = async () => {
    try {
      const categorydata = await axios
        .get("http://localhost:5000/get-category")
        .then((res) => {
          console.log(res);

          if (res) {
            setCategories(res.data.findcategory);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  // get all products
  const getallproducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/product-list/${page}`
      );
      setLoading(false);

      setProducts(data.productsofpage);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Filter function by category

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getallproducts();
    getallcategories();
    getTotalcount();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // get filterd product

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/filter-product",
        { checked, radio }
      );
      setProducts(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section id="main-page">
        <Header />
        {/* <Page/> */}

        {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}

        <div className="container-fluid">
          <div className="row" style={{ marginTop: '20px' }}>
            <div className="col-md-2">
              <h6 className="text-center" style={{ marginTop: '80px' }}>Filter By Category</h6>
              <div className="d-flex flex-column">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
              {/* Price Filter */}
              <h6 className="text-center mt-4">Filter By Price</h6>
              <div className="d-flex flex-column">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>

              <div className="d-flex flex-column">
                <button
                  className="btn btn-danger mt-4"
                  onClick={() => window.location.reload()}
                >
                  {" "}
                  RESET FILTERS{" "}
                </button>
              </div>

              {/* End Price Filter */}
            </div>

            <div className="col-md-10">
              {/* {JSON.stringify(radio, null, 4)} */}
              <h1 className="text-center">All Products</h1>

              <div className="d-flex flex-wrap">
                {products?.map((p) => (
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`http://localhost:5000/product-photo/${p._id}`}
                      class="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description.substring(0, 30)}...
                      </p>
                      <p className="card-text">$ {p.price}</p>

                      <button
                        className="btn btn-primary mr-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button className="btn btn-secondary ms-1"
                        onClick={() => {
                          setCart([...Cart, p])
                          localStorage.setItem('cart', JSON.stringify([...Cart, p]))
                          toast.success("Item Added to Cart")
                        }}

                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 p-3">
                {products && products.length < total && (
                  <button
                    className="btn btn-warning"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {loading ? "Loading..." : "Loadmore"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <ToastContainer />
      </section>
      <Footer />
    </>
  );
};

export default Home;
