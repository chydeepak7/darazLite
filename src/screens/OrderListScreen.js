import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";

import { listOrders } from "../actions/orderActions";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { saveShippingAddress } from "../actions/cartActions";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function OrderListScreen({ history }) {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <div className="container">
      <h1>Orders</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <table>
          <thead>
            <tr className="orderlisthead">
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>Total</th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr className="orderlistitems" key={order.id}>
                <td>{order.id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>Rs. {order.totalPrice}</td>

                <td>
                  <Link to={`/order/${order.id}`}>
                    <button className="button">Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderListScreen;
