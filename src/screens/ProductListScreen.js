import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { listUsers } from "../actions/userActions";
import {
  deleteProduct,
  listProducts,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

function ProductListScreen() {
  let a = 0;
  const dispatch = useDispatch();
  const history = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (successCreate) {
      history(`/admin/product/${createdProduct.id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, successDelete, successCreate, createProduct]);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div className="container">
      <h1>Products</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <table>
          <thead className="userhead">
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>

            <button className="button" onClick={() => createProductHandler()}>
              Create Product
            </button>
          </thead>
          <tbody>
            {products?.map((user) => (
              <tr className="userlist" key={user.id}>
                <td>{(a += 1)}</td>
                <td>{user.name}</td>
                <td>{user.price}</td>
                <Link to={`/admin/product/${user.id}/edit`}>
                  <button className="button">Edit</button>
                </Link>
                <button
                  className="button"
                  onClick={() => deleteHandler(user.id)}
                >
                  Delete
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductListScreen;
