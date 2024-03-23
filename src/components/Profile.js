import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Usermenu from "./Usermenu";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextapi/contextapi";
import axios from "axios";

const Profile = () => {
  //Context
  const [auth, setAuth] = useAuth();

  // All are State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password, address, phone);

    try {
      axios
        .put("http://localhost:5000/updateprofile", {
          name,
          email,
          password,
          phone,
          address,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.error) {
            toast.success(res.data.error);
          } else {
            setAuth({ ...auth, user: res.data.updateduser }); // data ka error araha tha is lye maine res.data ker deya please check this.
            let ls = localStorage.getItem("auth");
            ls = JSON.parse(ls);
            ls.user = res.data.updateduser;
            localStorage.setItem("auth", JSON.stringify(ls));
            toast.success("Profile Updated Successfully");
          }
        });
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <section id="main-page">
        <Header />

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <Usermenu />
            </div>

            <div className="col-md-9">
              <h3 className="text-center">User Profile</h3>
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
                    disabled
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

                {/* <div className="form-group">
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
                </div> */}

                <button
                  type="submit"
                  style={{ marginTop: "10px", marginBottom: "20px" }}
                  className="btn btn-primary"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Profile;
