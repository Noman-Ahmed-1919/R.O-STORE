import React, { useState } from "react";
import Header from './Header'
import Footer from './Footer'
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"




const Forgot = () => {

    const navigate = useNavigate()
    
      const [email, setEmail] = useState("");
      const [newpassword, setNewPassword] = useState("");
      const [question, setQuestion] = useState("");

    
    
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email,newpassword,question);
    
        try{
    
    axios.post("http://localhost:5000/forgot-password",{email,newpassword, question})
    .then((res) => {
      if(res.data){
        toast.success(res.data.message);
     
        navigate( "/login")
    
      }else{
        toast.error(res.data.message);
    
      }
    
    
    })
    
    }catch(error){
      console.log(error);
      toast.error("something went wrong");
    
    }
    
      };
    





  return (
    <>

<Header/>

      
      <div className='login'>
    <h1 style={{textAlign:"center"}}>Forgot Password</h1>

    <form onSubmit={handleSubmit} >
 

  <div className="form-group">
    <label for="exampleInputEmail1">Email</label>
    <input type="email" className="form-control" id="exampleInput"  placeholder="Enter Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    />
  </div>


  <div className="form-group">
    <label for="exampleInputEmail1">Best Friend</label>
    <input type="text" className="form-control" id="exampleInput"  placeholder="Enter your Best friend Name"
    value={question}
    onChange={(e) => setQuestion(e.target.value)}
    />
  </div>

  <div className="form-group">
    <label for="exampleInputPassword1">New Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
      value={newpassword}
      onChange={(e) => setNewPassword(e.target.value)}
    
    />
  </div>
 

  <button type="submit" className="btn btn-primary">Reset</button>
</form>
</div>

<Footer/>

    </>
  )
}

export default Forgot
