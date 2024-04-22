import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";

function CategoryProductScreen() {
  const { id } = useParams();
  const [categoryProduct, setCategoryProduct] = useState([]);
  useEffect(() => {
    async function fetchCategoryProduct() {
      const { data } = await axios.get(`/api/category/${id}`);
      setCategoryProduct(data);
    }
    fetchCategoryProduct();
  }, [id]);
  return (
    <div className="product container">
      {categoryProduct?.map((category) => (
        <Link to={`/product/${category.id}`} className="product_list">
          <img
            src={category.images}
            className="product_images"
            alt={category.id}
          ></img>
          <div className="product_text">
            <p>{category.name}</p>
            <h1 className="price">Rs. {category.price}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CategoryProductScreen;
