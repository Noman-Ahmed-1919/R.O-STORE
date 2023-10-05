import React, { useState, useEffect } from "react";
import Adminmenu from './Adminmenu';
import Header from './Header'
import axios from "axios"

import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const Products = () => {



const [productslist, setProductslist]= useState([]);

const getallproducts = async () => {
  try{


    axios.get("http://localhost:5000/get-product")
    .then((res) => {
      console.log(res.data)
    setProductslist(res.data.allproductslist)
    })
  }
  catch (error){
    console.log(error);
    toast.error("something went wrong");
  }
}


const getphoto = async () => {
  try{


    axios.get("http://localhost:5000/product-photo/:id")
    .then((res) => {
      console.log(res.data)
    // setProductslist(res.data.getphotoproduct)
    })
  }
  catch (error){
    console.log(error);
    toast.error("something went wrong");
  }
}

useEffect(() => {
  getallproducts();
  // getphoto();
}, []);


  return (
    <>
              <Header/>

      <div className='container-fluid m-3 p-3'>
<div className='row'>
    <div className='col-md-3'>
<Adminmenu/>
    </div>

    <div className='col-md-9'>
<h1 className='text-center'>All Products List</h1>

<div className="d-flex">

{
  productslist?.map(p => (

    <Link key={p._id}
    to={`/dashboard/admin/product/${p.slug}`}
    className="product-link"
    >
  

  <div className="card m-2" style={{width: "18rem"}} >
  <img src={`/getphotoproduct/product-photo/${p._id}`} class="card-img-top" alt={p.name}/>
  <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description}</p>
  </div>
</div>

</Link>

))
}
</div>

    </div>

</div>
      </div>



    </>
  )
}

export default Products;
