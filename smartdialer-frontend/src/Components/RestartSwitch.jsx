import React from "react";

const RestartSwitch = () => {
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
          <button className="btn" style={{ backgroundColor: "crimson" }}>
            Restart
          </button>
          <button className="btn">Cancel</button>
        </div>
      </div>
    </>
  );
};

export default RestartSwitch;
