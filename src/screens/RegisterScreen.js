import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;
  useEffect(() => {
    if (userInfo) {
      history(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
        setMessage("Passwords do not match")
    } else {

        dispatch(register(name, email, password));
    }
  };
  return (
    <div className="container">
      <h1>Register</h1>
      {message && <h2>{message}</h2>}
      <form onSubmit={submitHandler}>
        <div className="email">
          <label>Name:</label>
          <input
            type="name"
            name="name"
            value={name}
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
        <div className="password">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="password"
            value={confirmPassword}
            className="inputField"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button">
          Register
        </button>
      </form>
      <div>
        Already have an account?{" "}
        <Link to="/login" className="red">
          Login
        </Link>
      </div>
    </div>
  );
}

export default RegisterScreen;
