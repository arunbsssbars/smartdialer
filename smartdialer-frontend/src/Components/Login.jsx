import React from "react";

const Login = () => {
  return (
    <div className="mainContainer">
      <div className="loginImage">
        <img src=".\src\assets\login8.jpg" />
      </div>
      <div className="loginContainer">
        <div className="loginHeader">
          <h1>Routing</h1>
          <p>Dialer</p>
        </div>
        <div className="formContainer">
          <h3>Sign-In</h3>
          <form className="loginForm">
            <h2>User Name</h2>
            <input type="email" placeholder="Enter User Name Here" />
            <h2>Password</h2>
            <input type="password" placeholder="Enter Password" />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
