import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const RestartSwitch = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleRestartSwitch = () => {
    axios
      .post("/api/dashboard/restart-switch", null, {
        headers: {
          'Authorization': `Bearer ${token}`
      }})
      .then(function (response) {
        console.log(response.data.data);
        if (response.status === 200) alert(`Switch is Restarted successfully`);
        navigate("/dashboard");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        alert(` Please try again !! Failed to Restart Switch`);    
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
          <h1>Restart The Switch. Please Confirm</h1>
          <p>
            This will restart the Asterisk engine. Cancel if you change your
            mind
          </p>
        </div>
        <div className="btnContainer">
          <button className="btn" style={{ backgroundColor: " rgb(152, 12, 40)" }} onClick={handleRestartSwitch}>
            Restart
          </button>
          <button className="btn" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default RestartSwitch;
