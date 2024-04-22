import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { saveShippingAddress } from "../actions/cartActions";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function PlaceorderScreen() {

  const history = useNavigate();
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    history('/payment')
  }
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, items) => acc + items.qty * items.price,
    0
  );
  cart.totalPrice = cart.cartItems.reduce(
    (acc, items) => acc + items.qty * items.price,
    0
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (success) {
      history(`/order/${order.id}`)
      dispatch({type:ORDER_CREATE_RESET})
    }
  }, [success,history])
  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div className="container placeorder">
      <div className="left">
        <div className="address">
          <p>
            Address: {cart.shippingAddress.address}, {cart.shippingAddress.city}
            , {cart.shippingAddress.country}{" "}
          </p>
        </div>
        <div className="paymentMethod">
          <p>Payment Method: {cart.paymentMethod} </p>
        </div>
        <div className="orderItems">
          <h2>Order Items</h2>
          {cart.cartItems.map((item) => (
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
        <h2>Total: </h2>Rs.{" "}
        {cart.cartItems.reduce(
          (acc, items) => acc + items.qty * items.price,
          0
        )}
        <div>
          <button className="button" type="submit" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceorderScreen;
