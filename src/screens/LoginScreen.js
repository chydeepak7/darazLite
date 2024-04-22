import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const location = useLocation();
  const history = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      history(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email,password))
  };

  return (
    <div className="container loginbox">
      <h1>Sign In</h1>
      {error && <div>{error}</div>}
      <form onSubmit={submitHandler}>
        <div className="email">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
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
            value={password}
            className="inputField"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="button" type="submit">
          Sign In
        </button>
      </form>

      <div className="belowlogin">
        New Customer ?
        <Link
          className="red"
          to={redirect ? `/register/redirect=${redirect}` : "/register"}
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default LoginScreen;
