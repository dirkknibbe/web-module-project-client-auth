import React, { useState } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import Friends from "./components/Friends";
import Login from "./components/Login";
import AddFriend from "./components/AddFriend";
import axiosWithAuth from "./axios";
import axios from "axios";

const friendsUrl = "http://localhost:9000/api/friends";
const loginUrl = "http://localhost:9000/api/login";

export default function App() {
  const [friends, setFriends] = useState([]);

  const navigate = useNavigate();

  const login = ({ username, password }) => {
    axios
      .post(loginUrl, { username, password })
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        navigate("/addfriend");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };

  const getFriends = () => {
    axiosWithAuth()
      .get(friendsUrl)
      .then((res) => {
        setFriends(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postFriend = (friend) => {
    axiosWithAuth()
      .post(friendsUrl, friend)
      .then((res) => {
        setFriends(friends.concat(res.data.friend));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.StrictMode>
      <button id="logout" onClick={logout}>
        Logout
      </button>
      <h1>Advanced Applications</h1>
      <nav>
        <NavLink id="loginScreen" to="/">
          Login
        </NavLink>
        <NavLink id="friendsScreen" to="/addfriend">
          Add Friend
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Login login={login} />} />
        <Route
          path="addfriend"
          element={
            <>
              <AddFriend postFriend={postFriend} />
              <Friends friends={friends} getFriends={getFriends} />
            </>
          }
        />
      </Routes>
    </React.StrictMode>
  );
}
