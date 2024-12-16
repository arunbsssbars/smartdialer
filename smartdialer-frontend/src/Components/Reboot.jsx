import React from "react";

const Reboot = () => {
  return (
    <>
      <div className=" confirmContainer">
        <h2>Confirm</h2>
        <div className="confirmContent">
          <h1>Reboot Server. Please Confirm</h1>
          <p>
          This will Reboot the Server. Cancel if you change your mind
          </p>
        </div>
        <div className="btnContainer">
          <button className="btn" style={{ backgroundColor: "crimson" }}>
            Reboot
          </button>
          <button className="btn">Cancel</button>
        </div>
      </div>
    </>
  );
};

export default Reboot;
