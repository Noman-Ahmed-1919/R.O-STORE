const express = require("express");
require("./db/config");
const User = require("./db/model");

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


  const {name,email,password,phone,address} = req.body;

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
const user = new User({name, email, phone, password, address}).save()
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
  },
  token,
})


})


// protected route
// agar yaha se jo request jaye ge agar woh true hui tu user dashboard ko access ker sake gey.

app.get("/authenticated-user",  (req, res) => {

  res.status(200).send({ ok: true });

});


app.listen(5000, () => {
  console.log("Running port num at 5000");
});
