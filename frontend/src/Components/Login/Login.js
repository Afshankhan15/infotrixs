import React from "react";
import "./Login.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const Loginbtn = () => {
    const { email, password } = user;

    if (email && password) {
      axios
        .post("http://localhost:4000/login", user)
        .then((res) => {
          if (res.data.userToken) {
            // when user received token from SERVER
            localStorage.setItem("token", res.data.userToken); // store token on user local storage
            alert(`${res.data.LoginUser.name} Login Successfully`);
            setTimeout(() => {
              navigate("/dash");
            }, 2000);
          } else {
            alert(res.data.message);
          }
        })
        .catch((error) => {
          alert("Error in Login", error);
        });
    } else {
      alert("Please Enter your details");
    }
  };

  return (
    <>
      <Navbar />
      <div className="page">
        <div className="container">
          <p className="h1">LOGIN</p>
          <div className="input">
            <input
              className="inputval"
              type="email"
              name="email"
              value={user.email}
              placeholder="Email *"
              onChange={handleChange}
              required
            />
            <input
              className="inputval"
              type="password"
              name="password"
              value={user.password}
              placeholder="Password *"
              onChange={handleChange}
              required
            />
          </div>
          <div className="btnflex">
            <button onClick={Loginbtn} className="btn">
              Login
            </button>
            <Link to={"/"} style={{ color: "blue" }}>
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
