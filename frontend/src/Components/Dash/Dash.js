import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./Dash.css";

const Dash = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [result, setResult] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const fetchUserDetail = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await axios.get("http://localhost:4000/getUserInfo", {
          headers: {
            "x-access-token": token,
          },
        });

        if (response.data.message === "Token Valid") {
          setResult(response.data.ALLUser1); // FETCH ALL USER from BACKEND/SERVER
          // alert('GET NOTES');
        } else {
          alert("Token is invalid. Please log in again.");
        }
      }
    } catch (error) {
      alert("Error in getting User details. Please try again.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      const user = jwtDecode(token);

      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        fetchUserDetail();
      }
    }
  }, [navigate]);

  const addBtn = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please Login to add User");
      return;
    }

    const { name, email } = user;

    if (name && email) {
      try {
        const response = await axios.post(
          "http://localhost:4000/addUser",
          user,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );

        if (response.data.message === "New User Added") {
          alert("New User Added");
          fetchUserDetail();
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        alert("Error in Adding New User");
      }
    } else {
      alert("Please enter name and email to add");
    }
  };

  const LogOut = () => {
    const token = localStorage.getItem("token");

    // if token does not exist and still user click on logout button then alert message will be displayed on UI and return
    if (!token) {
      alert("Please Login First");
      setTimeout(() => {
        navigate("/login"); // Redirect to the login page
      }, 2000);
      return;
    }

    // else --> if token exist and user wants to logout

    localStorage.removeItem("token"); // Remove the token from localStorage
    alert("Logged out successfully");
    setTimeout(() => {
      navigate("/login"); // Redirect to the login page
    }, 2000);
    return;
  };

  const deleteBtn = (id) => {
    const token = localStorage.getItem("token"); // Get the token from local storage

    axios
      .post(
        "http://localhost:4000/deleteUser",
        { id },
        {
          headers: {
            "x-access-token": token, // Include the token in the request headers
          },
        }
      )
      .then((res) => {
        if (res.data.message === "User Deleted successfully") {
          setResult(res.data.AllUserDetail);
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        alert("Error deleting User", error);
      });
  };

  const updateBtn = async (id) => {
    const token = localStorage.getItem("token");
    const { name, email } = user;

    if (!name && !email) {
      alert("Please select name and email to update");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/userUpdate/${id}`, // Include the id in the URL
        { name, email }, // Include only the new selected name & email in the request body
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      if (response.data.message === "User updated successfully") {
        // Update the user's information in the state
        setResult(response.data.UserData); // Update with the updated user data
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Error updating User Info");
    }
  };

  return (
    <div className="dashpage">
      {console.log("ans: ", result)}
      <div className="dashcontainer">
        <input
          className="inputval1"
          type="text"
          name="name"
          value={user.name}
          placeholder="Name *"
          onChange={handleChange}
          required
        />
        <input
          className="inputval1"
          type="email"
          name="email"
          value={user.email}
          placeholder="Email *"
          onChange={handleChange}
          required
        />
        <button className="btn1" onClick={addBtn}>
          Add user
        </button>
        <button className="btn1" onClick={LogOut}>
          Logout
        </button>
        <div className="data1">
          <div className="datachild">
            <h1>Name</h1>
            <h1>Email</h1>
            <h1>Remove</h1>
          </div>
          {result.map((element) => {
            return (
              <div key={element._id} className="datachild">
                <h3>{element.name}</h3>
                <h3>{element.email}</h3>
                <div className="action-buttons">
                  <button onClick={() => deleteBtn(element._id)}>Delete</button>
                  <button onClick={() => updateBtn(element._id)}>Update</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dash;
