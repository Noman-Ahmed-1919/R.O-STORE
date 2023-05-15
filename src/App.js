import {
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import About from "./components/About";
import Home from './components/Home';
import Policy from "./components/Policy";
import Register from "./components/Register";
import Login from "./components/Login";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./components/user/Dashboard";
import Privateroute from "./Routes/Privateroute";

function App() {
  return (
    <div className="App">
      
      <Routes>

<Route exact path="/" element={<Home />} />

<Route path="/dashboard" element={<Privateroute/>}>

<Route exact path="" element={<Dashboard />} />


</Route>


<Route exact path="/policy" element={  <Policy/>} />
<Route exact path="/about" element={  <About/>} />
<Route exact path="/register" element={  <Register/>} />
<Route exact path="/login" element={  <Login/>} />





</Routes>

<ToastContainer />

    </div>
  );
}

export default App;
