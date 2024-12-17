import React from "react";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const handleForm = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/users/login", formData);
    console.log(response.data.data.accessToken);
    console.log(response.data.data.user);
  };

  const handleOnChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  return (
    <div className="formMainContainer">
      <div className="loginContainer">
        <div className="loginHeader">
          <h1>Routing</h1>
          <p>Dialer</p>
        </div>
        <div className="formContainer">
          <h3>Sign-In</h3>
          <form className="loginForm" onSubmit={handleForm}>
            <h2>Email</h2>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder="Enter Email"
            />
            <h2>Password</h2>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleOnChange(e)}
              placeholder="Enter Password"
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
      <div className="loginImage">
        <img src=".\src\assets\login16.jpg" />
      </div>
    </div>
  );
};

export default Login;
