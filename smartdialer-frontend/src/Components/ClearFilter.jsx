import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const clearFilter = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("true");
  useEffect(() => {
    getManageFilter();
  }, []);

  const getManageFilter = () => {
    axios
      .get("/api/dashboard/manage-filters")
      .then(function (response) {
        setData(response.data.data.results);
        // navigate('/agent-live')
        console.log(response.data.data.results);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };
  const handleChangeDuration = (e, id) => {
    console.log("updated duration is", e.target.value, "for id", id);
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, duration: e.target.value } : item
      )
    );
  };
  const handleUpdateDuration = async (id) => {
    const itemToBeUpdated = data.find((item) => item.id === id);
    console.log("Updating row:", itemToBeUpdated);
    // Perform update logic (e.g., API call) here
    try {
      //backend response will send an updated row data
      const response = await axios.post("/api/dashboard/update-duration", {
        itemToBeUpdated,
      });
      if(response.status === 200) alert(`Duration ${response.data.data.results[0].duration} ${response.data.data.results[0].duration>1 ? 'Minutes' : 'Minute'} is successfully updated for ${response.data.data.results[0].name}`)
      console.log(
       `Duration ${response.data.data.results[0].duration} ${response.data.data.results[0].duration>1 ? 'Minutes' : 'Minute'} is successfully updated for ${response.data.data.results[0].name}`
      );
    } catch (error) {
      console.log(`Error While updating Duration`, error);
    }
  };
  return (
    <div className="mainContainer">
      <div className="contentContainer">
        <h2>Clear Filter Table</h2>
        <p>Realtime Call Connectivity and User Status Display</p>
      </div>
      <div className="contentContainer">
        <h2>Group Auto Filter Delete</h2>
      </div>
      <div className="contentContainer">
        <h2>Clear Filter automatically</h2>
        {loading ? (
          <h1 style={{ margin: " 10rem", background: "transparent" }}>
            Loading...
          </h1>
        ) : (
          <div className="tableData">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>GROUP NAME</th>
                  <th>DURATION(MINS)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      <input
                        id="updateDuration"
                        type="text"
                        name="duration"
                        value={item.duration}
                        onChange={(e) => handleChangeDuration(e, item.id)}
                      />
                    </td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => handleUpdateDuration(item.id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="contentContainer">
        <div className=" confirmContainer">
          <h2>Confirm</h2>
          <div className="confirmContent">
            <h1>Clear Filter ALL. Please Confirm</h1>
            <p>
              This will Truncate the filter table. Cancel if you change your
              mind
            </p>
          </div>
          <div className="btnContainer">
            <button className="btn" style={{ backgroundColor: "crimson" }}>
              Truncate
            </button>
            <button className="btn">Cancel</button>
          </div>
        </div>
        <div className=" confirmContainer">
          <h2>Confirm Clean Group 1</h2>
          <div className="confirmContent">
            <h1>Clear Filter Group1. Please Confirm</h1>
            <p>
              This will Truncate the filter table. Cancel if you change your
              mind
            </p>
          </div>
          <div className="btnContainer">
            <button className="btn" style={{ backgroundColor: "crimson" }}>
              Truncate
            </button>
            <button className="btn">Cancel</button>
          </div>
        </div>
        <div className=" confirmContainer">
          <h2>Confirm Clean Group 2</h2>
          <div className="confirmContent">
            <h1>Clear Filter Group2. Please Confirm</h1>
            <p>
              This will Truncate the filter table. Cancel if you change your
              mind
            </p>
          </div>
          <div className="btnContainer">
            <button className="btn" style={{ backgroundColor: "crimson" }}>
              Truncate
            </button>
            <button className="btn">Cancel</button>
          </div>
        </div>
        <div className=" confirmContainer">
          <h2>Confirm Clean Group 3</h2>
          <div className="confirmContent">
            <h1>Clear Filter Group3. Please Confirm</h1>
            <p>
              This will Truncate the filter table. Cancel if you change your
              mind
            </p>
          </div>
          <div className="btnContainer">
            <button className="btn" style={{ backgroundColor: "crimson" }}>
              Truncate
            </button>
            <button className="btn">Cancel</button>
          </div>
        </div>
        <div className=" confirmContainer">
          <h2>Confirm Clean Group 4</h2>
          <div className="confirmContent">
            <h1>Clear Filter Group4. Please Confirm</h1>
            <p>
              This will Truncate the filter table. Cancel if you change your
              mind
            </p>
          </div>
          <div className="btnContainer">
            <button className="btn" style={{ backgroundColor: "crimson" }}>
              Truncate
            </button>
            <button className="btn">Cancel</button>
          </div>
        </div>
        <div className=" confirmContainer">
          <h2>Confirm Clean Group 5</h2>
          <div className="confirmContent">
            <h1>Clear Filter Group5. Please Confirm</h1>
            <p>
              This will Truncate the filter table. Cancel if you change your
              mind
            </p>
          </div>
          <div className="btnContainer">
            <button className="btn" style={{ backgroundColor: "crimson" }}>
              Truncate
            </button>
            <button className="btn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default clearFilter;
