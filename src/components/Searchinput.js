import React from "react";

import axios from "axios";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useSearch } from "../contextapi/search";

const Searchinput = () => {
  const navigate = useNavigate();

  const [values, setValues] = useSearch();

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = axios
        .get(`http://localhost:5000/search-products/${values.keyword}`)
        .then((res) => {
          console.log(res.data);
          setValues({ ...values, results: res.data });
          toast.success(`Product Found`);

          navigate("/search");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>

    
      <form className="d-flex" onSubmit={handlesubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default Searchinput;
