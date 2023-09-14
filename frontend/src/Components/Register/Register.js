import "./Register.css";
import Navbar from "../Navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const Registerbtn = () => {
    const { name, email, password } = user;

    if (name && email && password) {
      axios
        .post("http://localhost:4000/register", user)
        .then((res) => {
          if (res.data.message === "Successfully Registered") {
            alert("Successfully Registered");
          } else {
            alert(res.data.message);
          }
        })
        .catch((error) => {
          alert("Error during registration", error);
        });
    } else {
      alert("Please Enter your details");
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-page">
        <div className="register-container">
          <p className="register-h1">Register</p>
          <div className="register-input">
            <input
              className="register-inputval"
              type="text"
              name="name"
              value={user.name}
              placeholder="Name *"
              onChange={handleChange}
              required
            />
            <input
              className="register-inputval"
              type="email"
              name="email"
              value={user.email}
              placeholder="Email *"
              onChange={handleChange}
              required
            />
            <input
              className="register-inputval"
              type="password"
              name="password"
              value={user.password}
              placeholder="Password *"
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-btnflex">
            <button onClick={Registerbtn} className="register-btn">
              Sign Up
            </button>
            <Link to={"/login"} style={{ color: "blue" }}>
              Already have an account? Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
