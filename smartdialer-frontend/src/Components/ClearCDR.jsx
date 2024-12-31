import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ClearCDR = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleClearCDR = () => {
    axios
      .post("/api/dashboard/clear-cdr", null,{
        headers: {
          'Authorization': `Bearer ${token}`
      }})
      .then(function (response) {
        console.log(response.data.data);
        if (response.status === 200) alert(`CDR is successfully cleared`);
        navigate("/dashboard");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
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
          <h1>Clear CDR. Please Confirm</h1>
          <p>
            This will Truncate all the cdr records from db. Cancel if you change
            your mind
          </p>
        </div>
        <div className="btnContainer">
          <button
            className="btn"
            style={{ backgroundColor: " rgb(152, 12, 40)" }}
            onClick={handleClearCDR}
          >
            Truncate
          </button>
          <button className="btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ClearCDR;
