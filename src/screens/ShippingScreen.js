import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { saveShippingAddress } from "../actions/cartActions";

function ShippingScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const history = useNavigate();
  const dispatch = useDispatch();


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({address, city,postalCode,country}))
    history('/payment')
  };
  return (
    <div className="container">
      <h2>Shipping</h2>
      <form onSubmit={submitHandler}>
        <div className="email">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={address}
            className="inputField"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="email">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={city ? city : ""}
            className="inputField"
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="email">
          <label>Postal Code:</label>
          <input
            type="text"
            name="postalCode"
            value={postalCode ? postalCode : ""}
            className="inputField"
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div className="email">
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={country ? country : ""}
            className="inputField"
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button">
          Continue
        </button>
      </form>
    </div>
  );
}

export default ShippingScreen;
