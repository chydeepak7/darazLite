import React, { useState, useEffect } from "react";
import axios from "axios";

import { listProductsDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { saveShippingAddress } from "../actions/cartActions";
import { createOrder, getOrderDetails } from "../actions/orderActions";

function ProductEditScreen() {
  const { id } = useParams();
  const history = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history("/admin/productlist");
    } else {
      if (!product?.name || product?.id !== Number(id)) {
        dispatch(listProductsDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImages(product.images);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, product, id, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        id: id,
        name,
        price,
        images,
        category,
        countInStock,
        description,
      })
    );
  };

    const uploadFileHandler = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();

      formData.append("images", file);
      formData.append("product_id", id);

      setUploading(true);

      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const { data } = await axios.post(
          "/api/products/upload/",
          formData,
          config
        );

        setImages(data);
        setUploading(false);
      } catch (error) {
        setUploading(false);
      }
    };

  return (
    <div className="container">
      <Link to="/admin/productlist">Go Back</Link>

      <div>
        <h1>Edit Product</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={submitHandler}>
            {console.log(name, "sd")}
            <div class="form-group" id="name">
              <label for="name">Name</label>
              <input
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div class="form-group" id="price">
              <label for="price">Price</label>
              <input
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div class="form-group" id="image">
              <label for="image">Image</label>
              <input
                type="text"
                placeholder="Enter image"
                value={images}
                onChange={(e) => setImages(e.target.value)}
              />
              <input
              type="file"
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              />
              <div id="uploading" class="loader"></div>
            </div>

            <div class="form-group" id="countinstock">
              <label for="countinstock">Stock</label>
              <input
                type="number"
                placeholder="Enter stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>

            <div class="form-group" id="category">
              <label for="category">Category</label>
              <input
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div class="form-group" id="description">
              <label for="description">Description</label>
              <input
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button type="submit" class="button">
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProductEditScreen;
