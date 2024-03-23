import React, { useState, useEffect } from 'react'
import Header from './Header'
import Footer from "./Footer";
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";


const Categoryproduct = () => {

  const navigate = useNavigate();
  const params = useParams()
  
const [ products, setProducts] = useState([])
const [ category, setCategory] = useState([])


const getsimilarcategoryproducts = async () =>{
  try{
    const {data} = await axios.get(`http://localhost:5000/samecategory-product/${params.slug}`)
    .then((res) => {
      console.log( res.data);

     if(res.data){

      setProducts(res.data?.catsimilarproduct )
      setCategory(res.data?.category )
      console.log(setCategory)

     }

    });

  }
  catch(error){
console.log(error)

  }
} 

useEffect(() => {
  if(params?.slug)getsimilarcategoryproducts()

}, [params?.slug]);


  return (
    <>
    <section id='main-page'>

    <Header/>
    <div className='container-fluid'>
      <h1 className='text-center'>Category</h1>
<h3>{category?.name}</h3>
<h4>{products?.length} Result Found</h4>


<div className='row'>

<div className="d-flex flex-wrap">
                {products?.map((p) => (
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`http://localhost:5000/product/product-photo/${p._id}`}
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
                      <button className="btn btn-secondary ms-1">
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                ))}
              </div>

</div>

    </div>


    </section>
    <Footer/>

    </>
  )
}

export default Categoryproduct
