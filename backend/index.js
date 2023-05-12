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
    success:true,
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


if (req.body.password && req.body.email) {
  
  let user = await User.findOne(req.body).select("-password");

  if (user) {
    Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
      res.send({ message: "Login Successfull", user, auth: token });
    });
  } else {
    res.send({ message: "No User Found" });
  }
} else {
  res.send({ message: "Please Enter Correct Info!" });
}


})






app.listen(5000, () => {
  console.log("Running port num at 5000");
});
