import React, { useState, useEffect } from "react";
// import category from "../categorylist";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { listProducts } from "../actions/productActions";

function Product() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (<h1>{error}</h1>)
      : (
        <div className="product container">
          {products?.map((category) => (
            <Link to={`/product/${category.id}`} className="product_list">
              <img
                src={category.images}
                className="product_images"
                alt={category.id}
              ></img>
              <div className="product_text">
                <p>{category.name}</p>
                <h1 className="price">Rs. {category.price}</h1>
                <p>Rating: {category.rating}</p>
                <p>Reviews: {category.numReviews}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Product;
