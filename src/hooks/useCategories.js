import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategories() {
  const [categories, setCategories] = useState([]);

  //get cat
  const getcategories = async () => {
    try {
      const { data } = await axios
        .get("http://localhost:5000/get-category")
        .then((res) => {
          console.log(res);

          if (res) {
            setCategories(res.data.findcategory);
            console.log(res.data.findcategory)
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
getcategories()
},[])

return categories;
}
