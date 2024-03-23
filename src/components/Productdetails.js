import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { json, useParams } from "react-router-dom";

const Productdetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedproducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getproduct();
  }, [params?.slug]);

  //get products

  const getproduct = async () => {
    try {
      const { data } = await axios
        .get(`http://localhost:5000/getsingleproduct/${params.slug}`)
        .then((res) => {
          setProduct(res.data?.product);
          console.log(res.data.product);
        //   getsimilarproducts(
        //     res.data?.product._id,
        //     console.log(res.data?.product._id),
        //     // res.data?.product.category._id
        //   );
        });
    } catch (error) {
      console.log(error);
    }
  };

  // get similar products

//   const getsimilarproducts = async (pid, cid) => {
//     try {
//       const { data } = await axios
//         .get(`http://localhost:5000/similarproducts/${pid}/${cid}`)
//         .then((res) => {
//           setRelatedProducts(res.data?.similarproducts);
//           console.log(res.data?.similarproducts);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

  return (
    <>
      <section id="main-page">
        <Header />

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 mt-4">
              <img src={`http://localhost:5000/product-photo/${product._id}`} class="card-img-top" alt={product.name}/>
            </div>

            <div className="col-md-6">
              <h1 className="text">Products Details</h1>

              <h6>Name: {product.name}</h6>
              <h6>Description: {product.description}</h6>
              <h6>Price: {product.price}</h6>
              <h6>Category: {product.category?.name}</h6>
              <h6>Shipping: {product.shipping}</h6>

              <button className="btn btn-secondary ms-1">ADD TO CART</button>
            </div>
          </div>

<div className="container similar">

          <div className="row">
            <div className="col-12">

            <h1 className="text-center">Similar Products</h1>
            {JSON.stringify(relatedproducts, null, 4)}

            <div className="d-flex">
              {relatedproducts?.map((p) => (
                
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`http://localhost:5000/product-photo/${p._id}`}
                      class="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                      <button className="btn btn-secondary ms-1">ADD TO CART</button>

                    </div>
                  </div>
              ))}
            </div>

            </div>

          </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Productdetails;
