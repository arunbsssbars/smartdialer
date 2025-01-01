import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
const RebootServer = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleRebootServer = () => {
    alert("Processing Reboot Request....close your admin panel...TIMEOUT:60 secs");    
    navigate("/dashboard");
setTimeout(() => {
  axios
  .post("/api/dashboard/reboot-server", null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(function (response) {
    console.log(response.data.data);
    if (response.status === 200) alert(response.data.message);
  })
  .catch(function (error) {
    // handle error
    console.log(error.response.data);
    alert(` Please try again !! Failed to Reboot Server`);    
    navigate("/dashboard");
  });
}, 60*1000)
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
          <h1>Reboot Server. Please Confirm</h1>
          <p>This will Reboot the Server. Cancel if you change your mind</p>
        </div>
        <div className="btnContainer">
          <button
            className="btn"
            style={{ backgroundColor: " rgb(152, 12, 40)" }}
            onClick={handleRebootServer}
          >
            Reboot
          </button>
          <button className="btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default RebootServer;
