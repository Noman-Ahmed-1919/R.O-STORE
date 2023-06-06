const express = require("express");
require("./db/config");
const User = require("./db/model");
const slugify = require( "slugify");
const category = require("./db/category");
const formidable = require ("express-formidable");
const fs = require ("fs");
const products = require ("./db/products");

const cors = require("cors");
const Jwt = require("jsonwebtoken");
const jwtkey = "e-commerce";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
 
    res.send("hello, i am here!");


});

app.post("/register", async (req, res) => {


  const {name,email,password,phone,address, question} = req.body;

  //validation

  if(!name){
    return res.send({error: 'Name is Required'})
  }
  if(!email){
    return res.send({error: 'Email is Required'})
  } if(!password){
    return res.send({error: 'Password is Required'})
  } if(!phone){
    return res.send({error: 'Phone is Required'})
  } if(!address){
    return res.send({error: 'Address is Required'})
  } if(!question){
    return res.send({error: 'Question is Required'})
  }

//check user
const exisitinguser = await User.findOne({email})

// existing user
if(exisitinguser){
  return res.status(200).send({
    success:false,
    message:'Already Register Please Login'
  })
}

//save
const user = new User({name, email, phone, password, address, question}).save()
// yeh jo user nam ka variable hai na abb yeh sb kuch hai is k ander hi sara data save hua hua hai
// mongo db mai jo humari input field se aya hua hai
res.status(201).send(
  {
    success:true,
    message:"User Register Successfully!",
    user
  }
)
});




//login api

app.post("/login", async (req, res) => {

  console.log(req.body);

  const {email,password} = req.body;


if(!email || !password){
  return res.status(404).send({
    success:false,
    message: "Invalid email or password"
  })
}

// check user

const user = await User.findOne({email})
console.log(user);

if(!user){
  return res.status(404).send({
    success:false,
    message: "Email is not registerd"
  })
}


// match password
const matchpassword = await (password,user.password)
if(!matchpassword){
  return res.status(200).send({
    success:false,
    message:"Invalid Password"
  })
}
const token = await Jwt.sign({_id:user._id}, jwtkey, {expiresIn: "2h",
});

  
  res.status(200).send({
  success:true,
  message:"Login Successfully",
  user:{
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    role: user.role,
  },
  token,
})


})


// protected route user
// agar yaha se jo request jaye ge agar woh true hui tu user dashboard ko access ker sake gey.

app.get("/authenticated-user",  (req, res) => {

  res.status(200).send({ ok: true });

});


// protected route admin

app.get("/authenticated-admin",  (req, res) => {

  res.status(200).send({ ok: true });
});


//forgot password

app.post("/forgot-password", async  (req, res) => {

try{
const {email, question, newpassword} =req.body

if(!email){
  res.status(400).send({message:"Email is required"})

}
if(!question){
  res.status(400).send({message:"Question is required"})
  
}
if(!newpassword){
  res.status(400).send({message:"New Password is required"})
  
}
//check

const user = await  User.findOne({email,question})
//validation
if(!user){
  return res.status(404).send({
    success:false,
    message:"Wrong Email or Question"
  });
}
 await User.findByIdAndUpdate(user._id, {password:newpassword});
 res.status(200).send({
  success: true,
  message: "Password Reset Successfully",
 })

}
catch (error){
console.log(error)
res.status(500).send({
  success:false,
  message:"Something went wrong",
  error
})
}
});


//create-category route

app.post("/create-category", async  (req, res) => {

try {

const {name} = req.body

  if(!name){
    return res.status(401).send({message:"Name is Required"})
  }

const existingcategory = await category.findOne({name})
if(existingcategory){
  return res.status(200).send({
    success:true,
    message:"Category Already Exisits"
  })
}

const multiplecategory = await new category({name, slug:slugify(name)}).save()
res.status(201).send({
  success:true,
  message:'new category created',
  multiplecategory,
})

} catch (error){
  console.log(error)
  res.status(500).send({
    success:false,
    error,
    message: "Error in Category"
  })
}
})


//update category


app.put("/update-category/:id", async  (req, res) => {

try{

const {name} = req.body;
const {id} = req.params;

const updatecategory = await category.findByIdAndUpdate(
  id,
  {name, slug: slugify(name)},
  {new: true}
);
res.status(200).send({
  success: true,
  message: "Category Updated Successfully",
  updatecategory,
});
}catch{
  res.status(500).send({
    success:false,
    error,
    message: "Error while updating category"
  })
}
})

//get all category

app.get("/get-category", async  (req, res) => {

try{
  const findcategory = await category.find({});
  res.status(200).send({
    success:true,
    message:"All Categories List",
    findcategory,
  })
  // console.log(    findcategory  );

}
catch(error){
  console.log(error)
  res.status(500).send({
    success:false,
    error,
    message: "Error while getting all category"
  })
}


})


//get single category


app.get("/single-category/:slug", async  (req, res) => {

  try{
    const category = await category.findOne({slug: req.params.slug});
    res.status(200).send({
      success:true,
      message:"Get Single Category Successfully",
      category,
    })
  
  }
  catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message: "Error while getting single category"
    })
  }
  })

// delete category

  app.delete("/delete-category/:id", async  (req, res) => {

    try{

const {id} = req.params;
await category.findByIdAndDelete(id);
      res.status(200).send({
        success:true,
        message:"Category Deleted Successfully",
        category,
      })
    
    }
    catch(error){
      console.log(error)
      res.status(500).send({
        success:false,
        error,
        message: "Error while delete category"
      })
    }
    })


    //Now we are creating Products Routes.
// all crud operation create product, delete product, update and delete.


app.post("/create-product", formidable(), async  (req, res) => {

  try{

const {name,slug,description,price,category,quantity,shipping} =  req.fields
const {photo} = req.files 

// validation ziada honey ki waja se switch case use ker rahe hain

switch(true){

case !name:
return res.status(500).send({error:"Name is Require"})
case !description:
return res.status(500).send({error:"Description is Require"})
case !price:
return res.status(500).send({error:"Price is Require"})
case !category:
return res.status(500).send({error:"Category is Require"})
case !quantity:
return res.status(500).send({error:"Quantity is Require"})
case photo && photo.size > 1000000:
return res.status(500).send({error:"photo is Required and should be less then 1mb"})
                                                
  
  }
  // const addingproducts = new products({...req.body, slug: slugify(name)}).save();

  const addingproducts = new products({...req.fields, slug: slugify(name)});
  if(photo) {
    
    addingproducts.photo = fs.readFileSync(photo.path);
    addingproducts.photo.contentType = photo.type;

  }

await addingproducts.save();
  res.status(201).send({
success: true,
message: "Product Created Successfully",
addingproducts,

  });

  }
  catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message: "Error is creating product"
    })
  }
  })


//get all products


app.get("/get-product", async  (req, res) => {

  try{

const allproductslist = await products.find({}).populate('category').select("-photo").limit(12).sort({createdAt: -1});
res.status(200).send({
  success: true,
  total: products.length,
  message: "All Products",
  allproductslist,
});
  
  }
  catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message: "Error in Getting Products"
    })
  }
  })





//get single products


app.get("/get-singleproduct/:slug", async  (req, res) => {

  try{

const product = await products.findOne({ slug: req.params.slug}).select("-photo").populate('category');
res.status(200).send({
  success: true,
  message: "Single Product Fetched",
  product,
});
  
  }
  catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message: "Error while Getting Single Product"
    })
  }
  })



// get photo

app.get("/product-photo/:productid", async  (req, res) => {

  try{

const product = await products.findById(req.params.productid).select("photo");

if(product.photo.data){

  res.set("Content-type", product.photo.contentType);
return res.status(200).send(product.photo.data);
   

}

  }
  catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message: "Error while Getting Product Photo"
    })
  }
  })



  // delete product

app.get("/delete-product/productid", async  (req, res) => {

  try{
 await products.findByIdAnd("-photo");
 res.status(200).send({
  success: true,
  message: "Product Deleted Successfully"
 });


  }
  catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message: "Error while deleting Product"
    })
  }
  })



// update products

  app.put("/update-product/:id", async  (req, res) => {

    try{
    
   
const {name,slug,description,price,category,quantity,shipping} = req.fields
const {photo} = req.files 

// validation ziada honey ki waja se switch case use ker rahe hain

switch(true){

case !name:
return res.status(500).send({error:"Name is Require"})
case !description:
return res.status(500).send({error:"Description is Require"})
case !price:
return res.status(500).send({error:"Price is Require"})
case !category:
return res.status(500).send({error:"Category is Require"})
case !quantity:
return res.status(500).send({error:"Quantity is Require"})
case photo && photo.size > 1000000:
return res.status(500).send({error:"photo is Required and should be less then 1mb"})
                                                
}

const products = await productModel.findByIdAndUpdate(
  req.params.productid,
  { ...req.fields, slug: slugify(name)},
  { new: true}
);

  if(photo) {
    products.photo.data = fs.readFileSync(photo.path);
    products.photo.contentType = photo.type;

  }
  await products.save();
  res.status(201).send({
success: true,
message: "Product Created Successfully",
products,

  });

    }catch{
      console.log(error)
      res.status(500).send({
        success:false,
        error,
        message: "Error while update product"
      })
    }
    })




app.listen(5000, () => {
  console.log("Running port num at 5000");
});
