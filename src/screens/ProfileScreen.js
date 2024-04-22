import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders } from "../actions/orderActions";

function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;
  // console.log('32')
  useEffect(() => {
    if (!userInfo) {
      history("/login");
    } else {
      if (!user || user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        dispatch(listMyOrders());
        console.log("test23");
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      //   dsfsdfsdfsdfdsf
      dispatch(
        updateUserProfile({
          id: user.id,
          name: name,
          email: email,
          password: password,
        })
      );
    }
  };
  return (
    <div className="container profile_container">
      <div className="user_profile">
        <h2>USER PROFILE</h2>
        {message && <h2>{message}</h2>}
        <form onSubmit={submitHandler}>
          <div className="email">
            <label>Name:</label>
            <input
              type="name"
              name="name"
              placeholder={userInfo?.name}
              // value={userInfo?.name}
              className="inputField"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="email">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder={userInfo?.email}
              // value={userInfo?.email}
              className="inputField"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="password">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              // value={""}
              className="inputField"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="password">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="password"
              // value={""}
              className="inputField"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button">
            Update
          </button>
        </form>
      </div>
      <div className="my_orders">
        <h2>MY ORDERS{errorOrders}</h2>
        {loading ? (
          <div>Loading...</div>
        ) : errorOrders ? (
          { errorOrders }
        ) : (
          <table>
            <thead>
              <tr>ID</tr>
              <tr>Date</tr>
              <tr>Total</tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr>
                  <td className="order">{order.id}</td>
                  <td className="order">{order.createdAt.substring(0, 10)}</td>
                  <td className="order">{order.totalPrice}</td>
                  <Link to={`/order/${order.id}/`} className="order orderbtn">
                    <button className="button">

                    Details
                    </button>
                    </Link>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProfileScreen;
