import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { saveShippingAddress } from "../actions/cartActions";
import { createOrder, getOrderDetails } from "../actions/orderActions";

function OrderScreen() {
  const { id } = useParams();
  const history = useNavigate();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, items) => acc + items.qty * items.price,
      0
    );
  }

  const dispatch = useDispatch();
  useEffect(() => {
    if (!order || order.id !== Number(id)) {
      dispatch(getOrderDetails(id));
    }
  }, [order, id]);
  // console.log(order.shippingAddress.address, "test");
  return (
    <div className="container placeorder">
      <div className="left">
        <div className="address">
          <h1>Order: {order?.id}</h1>

          <p>
            Address: {order?.shippingAddress?.address},{" "}
            {order?.shippingAddress?.city}, {order?.shippingAddress.country}{" "}
          </p>
        </div>
        <div className="paymentMethod">
          <p>Payment Method: {order?.paymentMethod} </p>
        </div>
        <div className="cartItems">
          <h2>Order Items</h2>
          {order?.orderItems?.map((item) => (
            <div className="cart_list">
              <img
                src={item.image}
                className="cart_list_image"
                alt={item.name}
              ></img>
              <Link to={`/product/${item.product}`}>{item.name}</Link>
              <div>
                {item.qty} * Rs. {item.price} = Rs. {item.qty * item.price}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container">
        <h2>Total: </h2>Rs. {order?.totalPrice}
      </div>
    </div>
  );
}

export default OrderScreen;
