import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const ClearCDR = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleClearCDR = () => {
    axios
      .post("/api/dashboard/clear-cdr", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response.data.data);
        if (response.status === 200) 
          toast.success("CDR is successfully cleared");  
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        toast.error(`Failed to clear CDR`);
      });
  };
  const handleCancel = () => {
    // handle cancel
    navigate("/dashboard");
  };
  return (
    <>
      <ToastContainer autoClose={1000} />
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
