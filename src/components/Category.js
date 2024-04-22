import React, { useState, useEffect } from "react";
// import category from "../categorylist";
import axios from "axios";
import { Link } from "react-router-dom";

function Category() {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    async function fetchCategory() {
      const { data } = await axios.get("/api/category/");
      setCategory(data);
    }
    fetchCategory();
  }, []);
  return (
    <div className="category container">
      {category.map((category) => (
        <Link to={`/category/${category.id}`} className="category_list center">
          <img
            src={category.images}
            className="category_images"
            alt={category.name}
          ></img>
          <p>{category.name}</p>
        </Link>
      ))}
    </div>
  );
}

export default Category;
