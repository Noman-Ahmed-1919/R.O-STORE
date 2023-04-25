import {
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Policy from "./components/Policy";

function App() {
  return (
    <div className="App">
      
      <Routes>

<Route exact path="/" element={<Home />} />

<Route exact path="/policy" element={  <Policy/>} />




</Routes>


    </div>
  );
}

export default App;
