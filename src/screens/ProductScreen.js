import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductsDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

function ProductScreen() {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  const history = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();

  // useEffect(() => {
  //   dispatch(listProductsDetails(id));
  // }, []);
  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductsDetails(id));
  }, [dispatch, id, successProductReview]);
  const addToCartHandler = () => {
    history(`/cart/${id}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };
  // const product = category.find((p) => p.id == id);
  return (
    <div>
      <div className="container product_screen">
        <img
          src={product.images}
          className="product_screen_image"
          alt={product.name}
        ></img>

        <div className="product_screen_details">
          <div className="product_screen_details_name">{product.name}</div>
          <div className="product_screen_details_details">
            {product.description}
          </div>
          <div className="product_screen_details_price price">
            Rs. {product.price}
          </div>
          <div className="product_screen_details_price price">
            Rating: {product.rating}
          </div>
          <div className="product_screen_details_price price">
            Reviews: {product.numReviews}
          </div>
        </div>
        <div className="product_screen_delivery">
          <div className="product_screen_delivery_price">
            <div>Price:</div>
            <div>Rs. {product.price}</div>
          </div>
          <div className="product_screen_delivery_stock">
            <div>Status:</div>
            <div>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</div>
          </div>
          {product.countInStock > 0 && (
            <div className="product_screen_delivery_qty">
              <select class="dropdown" onChange={(e) => setQty(e.target.value)}>
                {[...Array(product.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="produc_screen_delivery_addtocart">
            <button
              onClick={addToCartHandler}
              type="button"
              disabled={product.countInStock == 0}
              className="button"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>Reviews</h2>
        {product.reviews.length === 0 && <div>No Reviews</div>}
        {/* /---------------------------------------------------------------------------------- */}

        <div variant="flush">
          {product.reviews.map((review) => (
            <div key={review._id}>
              <strong>{review.name}</strong>
              <p>{review.rating}</p>
              {/* <Rating value={review.rating} color="#f8e825" /> */}

              <p>{review.comment}</p>
            </div>
          ))}

          <div>
            <h4>Write a review</h4>

            {loadingProductReview && <div>Loading...</div>}
            {successProductReview && <div>Review Submitted</div>}
            {errorProductReview && <div>{errorProductReview}</div>}

            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div controlId="rating">
                  <label>Rating</label>
                  <select
                    as="select"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>

                <div>
                  <label>Review</label>
                  <input
                    as="textarea"
                    row="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></input>
                </div>

                <button
                  disabled={loadingProductReview}
                  type="submit"
                  className="button"
                >
                  Submit
                </button>
              </form>
            ) : (
              <div>
                Please <Link to="/login">login</Link> to write a review
              </div>
            )}
          </div>
        </div>

        {/* /---------------------------------------------------------------------------------- */}
      </div>
    </div>
  );
}

export default ProductScreen;
