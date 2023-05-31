import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { toast } from "react-toastify";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Register = () => {

  const navigate = useNavigate()


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [question, setQuestion] = useState("");



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name,email,password,address,phone,question);

try{

axios.post("http://localhost:5000/register",{name,email,password,phone,address,question})
.then((res) => {
  if(res.data){
    toast.success(res.data.message);
    navigate("/login")

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
      <Header />

      <div className="container" id="regdiv">
      <h1 style={{ textAlign: "center" }}>Register</h1>

        <div className="row">
          <div className="col-md-6">
            <div className="register">

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label for="exampleInputEmail1">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInput"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label for="exampleInputEmail1">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInput"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                    required

                  />
                </div>

                <div className="form-group">
                  <label for="exampleInputEmail1">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInput"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Address"
                    required

                  />
                </div>

                <div className="form-group">
                  <label for="exampleInputEmail1">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInput"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter Phone Number"
                    required

                  />
                </div>

                <div className="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required

                  />
                </div>



                <div className="form-group">
                  <label for="exampleInputPassword1">Best Friend</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="What is your Best Friend Name"
                    required

                  />
                </div>

                <button
                  type="submit"
                  style={{ marginTop: "10px", marginBottom: "20px" }}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          <div className="col-md-6">

          <h6 className="sign">Sign up with Google!</h6>

            <div className="googlebtn">

              <LoginSocialGoogle
                client_id={
                  "307536093349-jcpf2v1hic7dmv4iim9eb6tfr87khde2.apps.googleusercontent.com"
                }
                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                onResolve={({ provider, data }) => {
                  console.log(provider, data);
                }}
                onReject={(err) => {
                  console.log(err);
                }}
              >
                <GoogleLoginButton />
              </LoginSocialGoogle>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Register;
