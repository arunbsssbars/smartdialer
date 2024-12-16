import React from "react";
import Confirm from "./Other Components/Confirm";

const ClearCDR = () => {
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
          <button className="btn" style={{ backgroundColor: "crimson" }}>
            Truncate
          </button>
          <button className="btn">Cancel</button>
        </div>
      </div>
    </>
  );
};

export default ClearCDR;
