import React, { useState, useEffect,Routes, Route,  } from "react";
// import { Routes, Route, useParams } from 'react-router-dom';
import Header from "./Header";

import Adminmenu from "./Adminmenu";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;




const Updateproduct = () => {



    const navigate = useNavigate();
const params = useParams() // useParams is lye used karte hain tak hum apne url to get ker sake
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
  
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

//get single product

console.log(params.slug);


const getsingleproduct = async () =>{
  try{

    const getoneproduct = await axios.get(`http://localhost:5000/getsingleproduct/${params.slug}`)

.then((res) => {
  if (res) {

    setName(res.data.product.name);
    setId(res.data.product._id);
    setDescription(res.data.product.description);
    setPrice(res.data.product.price);
    setQuantity(res.data.product.quantity);
    setCategory(res.data.product.category._id);
    console.log(res.data);
  }
});

  }catch(error){
    console.log(error)
  }



}


useEffect(() => {
  getsingleproduct();
  // eslint-disbale-next-line

}, []);




    //   get all categories
  
    const getallcategories = async () => {
      try {
        const categorydata = await axios.get("http://localhost:5000/get-category")
          .then((res) => {
            if (res) {
              setCategories(res.data.findcategory);
            }
          });
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong in getting category");
      }
    };
  
    useEffect(() => {
      getallcategories();
      // getsingleproduct();

    });
  
    // create product function
  
    const handleupdate = async (e) => {
      e.preventDefault();
  
      try {
        // yeh kam hum register mai jis tarah kara hai na ker sakte thy but photo bhi hai tu hum dataform ki madad se kare ki jo browser ki default property hai
  
        const productdata = new FormData();
        productdata.append("name", name);
        productdata.append("description", description);
        productdata.append("price", price);
        productdata.append("quantity", quantity);
        productdata.append("photo", photo);
        productdata.append("category", category);
  
   const {data} =     axios.put(`http://localhost:5000/update-product/${params.slug}`, productdata)
          .then((res) => {
            console.log(data);
  
            if (res?.data) {
              toast.success("Product  Update Successfully");
              navigate("/dashboard/admin/products");
            } else {
              toast.error(res?.data.message);
            }
          });
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    };



  return (
    <>
      
      <Header/>

<div className="container-fluid m-3 p-3">
  <div className="row">
    <div className="col-md-3">
      <Adminmenu />
    </div>

    <div className="col-md-9">
      <h1>UPDATE PRODUCTS</h1>

      <div className="m-1 w-80">
        <Select
          placeholder="Select a Category"
          size="large"
          showSearch
          className="form-select mb-3"
          onChange={(value) => {
            setCategory(value);
          }}

          value={category}
        >
          {categories?.map((c) => (
            <Option key={c._id} value={c._id}>
              {c.name}
            </Option>
          ))}
        </Select>


        <div className="mb-3 ">
          <label className="btn btn-outline-secondary col-md-12">
            {photo ? photo.name : "Upload Photo"}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              hidden
            />
          </label>
        </div>

        <div className="mb-3">
          {photo && (
            <div>
              <img
                src={URL.createObjectURL(photo)}
                alt="product_photo"
                height={"200"}
                className="img img-responsive"
              />
            </div>
          )}
        </div>

        <div className="mb-3">
          <input
            type="text"
            value={name}
            placeholder="Write a name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="text-area"
            value={description}
            placeholder="Write a description"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            value={price}
            placeholder="Write a Price"
            className="form-control"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            value={quantity}
            placeholder="Write a quantity"
            className="form-control"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <Select
            placeholder="Select Shipping"
            size="large"
            showSearch
            className="form-select mb-3"
            onChange={(value) => {
              setShipping(value);
            }}
            value={shipping ? "yes": "No"}
          >
            <Option value="0">No</Option>
            <Option value="1">Yes</Option>
          </Select>
        </div>

        <div className="mb-3">
          <button className="btn btn-primary" onClick={handleupdate}>
            Update Product
          </button>
        </div>
      </div>
    </div>
  </div>
</div>



    </>
  )
}

export default Updateproduct;
