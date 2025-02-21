import React from "react";
import { useState } from "react";
import axios from "axios";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

const Login = ({ setToken, setTokenExpiry }) => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", formData);
      setToken(response.data.data.accessToken);
      localStorage.setItem("token", response.data.data.accessToken);
      setTokenExpiry(response.data.data.tokenExpiry);
      localStorage.setItem("tokenExpiry", response.data.data.tokenExpiry);
      setformData({
        email: "",
        password: "",
      });
    } catch (error) {
      setformData({
        email: "",
        password: "",
      });
      console.log("Error logging in:", error.response.data);
      if (error.response) {
        toast.error(error.response.data); // Display the error message as a toast
      }
    }
  };

  const handleOnChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="formMainContainer">
        <div className="loginContainer">
          <div className="formContainer">
            <h3>
              <span>
                <MdOutlineAssignmentInd />
              </span>
              Sign-In
            </h3>
            <form className="loginForm" onSubmit={handleForm}>
              {/* <h2>Email</h2> */}
              <div className="iconContainer">
                <MdOutlineEmail />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  placeholder="Enter Email"
                />
              </div>
              {/* <h2>Password</h2> */}
              <div className="iconContainer">
                <TbLockPassword />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => handleOnChange(e)}
                  placeholder="Enter Password"
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
        <div className="loginImage">
          <div className="loginHeader">
            <h1>Routing</h1>
            <p>Dialer</p>
          </div>
          {/* <img src=".\src\assets\login15.jpg" /> */}
        </div>
      </div>
    </>
  );
};

export default Login;
