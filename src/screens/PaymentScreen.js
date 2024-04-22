import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { saveShippingAddress } from "../actions/cartActions";

import { savePaymentMethod } from '../actions/cartActions'
function PaymentScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const history = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
  if (!shippingAddress.address) {
    history.push("/shipping");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod))
    history(`/placeorder`);
  };

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <div>
          <input
            type="radio"
            label="cashOnDelivery"
            name="paymentMethod"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
            value={"cash on delivery"}
          />
          <label>Cash On Delivery</label>
        </div>

        <button type="submit" className="button">
          Continue
        </button>
      </form>
    </div>
  );
}

export default PaymentScreen;
