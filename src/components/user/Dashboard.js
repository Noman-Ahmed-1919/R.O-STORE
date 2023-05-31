import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import Usermenu from "../Usermenu";
import { useAuth } from "../../contextapi/contextapi";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <>
      <Header />

      <div className="container-fluid  ">
        <div className="row">
          <div className="col-md-3">
            <Usermenu />
          </div>

          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h1> Admin Name: {auth?.user?.name}</h1>
              <h1> Admin Email: {auth?.user?.email}</h1>
              <h1> Admin Contact No: {auth?.user?.address}</h1>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
