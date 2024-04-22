import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { listUsers } from "../actions/userActions";

function UserListScreen() {
  let a = 0;
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);
  return (
    <div className="container">
      <h1>Users</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <table>
          <thead className="userhead">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr className="userlist" key={user.id}>
                <td>{(a += 1)}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? (<div>yes</div>): (<div>no</div>)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserListScreen;
