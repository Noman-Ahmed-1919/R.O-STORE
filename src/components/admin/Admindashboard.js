import React from "react";
import Adminmenu from "../Adminmenu";
import { useAuth } from "../../contextapi/contextapi";
import Header from "../Header";
import Footer from "../Footer";

const Admindashboard = () =>{

const [auth] = useAuth();

    return(
        <>
        <Header/>

<div className="container-fluid m-3 p-3">
    <div className="row">
        <div className="col-md-3">
<Adminmenu/>
        </div>

        <div className="col-md-9">

            <div className="card w-75 p-3">
                <h1> Admin Name: {auth?.user?.name}</h1>
                <h1> Admin Email: {auth?.user?.email}</h1>
                <h1> Admin Contact No: {auth?.user?.phone}</h1>


            </div>

        </div>
        
    </div>

</div>

<Footer/>
        </>
    )
}

export default Admindashboard;