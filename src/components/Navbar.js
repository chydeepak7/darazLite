import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
function Navbar() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className="navbar">
      <Link to={"/"}>
        <div className="logo">Daraz</div>
      </Link>
      <div className="search"></div>
      <div className="log">
        {userInfo ? (
          <Link as={"div"} to={`/profile`} className="login">
            {/* <i className="fa-regular fa-user profile logo-font"></i> */}
            <p>{userInfo.name}</p>
          </Link>
        ) : (
          <Link as={"div"} to={`/login`} className="login">
            <i className="fa-regular fa-user profile logo-font"></i>
            <p>Login</p>
          </Link>
        )}
        {userInfo ? (
          <Link className="sign" onClick={logoutHandler}>
            Logout
          </Link>
        ) : (
          <Link className="sign">Sign Up</Link>
        )}

        <div className="cart">
          <Link to={`/cart`}>
          <i className="fa-solid fa-cart-shopping logo-font"></i>
          </Link>
        </div>

        {userInfo && userInfo.isAdmin && (
          <div className="admin-items">
          <Link as={"div"} to={`/admin/userlist`} className="login">
          <p>Users</p>
        </Link>
          <Link as={"div"} to={`/admin/productlist`} className="login">
          <p>Products</p>
        </Link>
          <Link as={"div"} to={`/admin/orderlist`} className="login">
          <p>Orders</p>
        </Link>
        </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
