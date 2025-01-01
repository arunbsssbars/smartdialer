import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const RestartDB = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleRestartDB = () => {
    axios
      .post("/api/dashboard/restart-db", null,{
        headers: {
          'Authorization': `Bearer ${token}`
      }})
      .then(function (response) {
        console.log(response.data.data);
        if (response.status === 200) alert(`DB is Restarted successfully`);
      })
      .catch(function (error) {
        // handle error
        console.log(error);    
        alert(` Please try again !! Failed to Restart DB`);    
        navigate("/dashboard");
      });
  };
  const handleCancel = () => {
    // handle cancel
    navigate("/dashboard");
  };
  return (
    <>
      <div className=" confirmContainer">
        <h2>Confirm</h2>
        <div className="confirmContent">
          <h1>Restart Database. Please Confirm</h1>
          <p>
            This will restart the MariaDB Database. Cancel if you change your
            mind
          </p>
        </div>
        <div className="btnContainer">
          <button className="btn" style={{ backgroundColor: " rgb(152, 12, 40)" }} onClick={handleRestartDB}>
            Restart
          </button>
          <button className="btn" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default RestartDB;
