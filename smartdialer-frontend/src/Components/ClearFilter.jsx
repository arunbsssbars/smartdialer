import React from "react";
import axios from "axios";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router";
const clearFilter = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("false");
  const [groupName, setGroupName] = useState('')
  const token=localStorage.getItem("token");  
  const navigate = useNavigate();

  useEffect(() => {
    getClearFilterInitialData();
  }, []);


  const getClearFilterInitialData = () => {
    setLoading(true);
    axios
      .get("/api/dashboard/clear-filter")
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
        setLoading(false);
      });
  };

  const handleChangeDuration = (e, id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, cleartime: e.target.value } : item
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
      },{
        headers: {
          'Authorization': `Bearer ${token}`
      }});
      if(response.status === 200) alert(`Duration ${response.data.data.results[0].cleartime} ${response.data.data.results[0].cleartime>1 ? 'Minutes' : 'Minute'} is successfully updated for ${response.data.data.results[0].groups}`)
      console.log(
      `Duration ${response.data.data.results[0].cleartime} ${response.data.data.results[0].cleartime>1 ? 'Minutes' : 'Minute'} is successfully updated for ${response.data.data.results[0].groups}`
      );
    } catch (error) {
      console.log(`Error While updating Duration`, error);
    }
  };

  const handleClearBulkFilter = (e) => {
    setGroupName(e.target.name);
    const groupName = e.target.name;
    axios
      .post("/api/dashboard/clear-Bulk-Filter", {groupName},{
        headers: {
          'Authorization': `Bearer ${token}`
      }})
      .then(function (response) {
        if (response.status === 200) alert(`Filter for ${response.data.data.groupName} is successfully cleared`);
        // navigate("/dashboard");
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
                    <td>{item.groups}</td>
                    <td>
                      <input
                        id="updateDuration"
                        type="text"
                        name="duration"
                        value={item.cleartime}
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
            <button className="btn" style={{ backgroundColor: "crimson" }} name='all' onClick={(e)=>handleClearBulkFilter(e)}>
              Truncate
            </button>
            <button className="btn" onClick={handleCancel}>Cancel</button>
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
            <button className="btn" style={{ backgroundColor: "crimson" }} name='group1' onClick={(e)=>handleClearBulkFilter(e)}>
              Truncate
            </button>
            <button className="btn" onClick={handleCancel}>Cancel</button>
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
            <button className="btn" style={{ backgroundColor: "crimson" }} name='group2' onClick={(e)=>handleClearBulkFilter(e)}>
              Truncate
            </button>
            <button className="btn" onClick={handleCancel}>Cancel</button>
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
            <button className="btn" style={{ backgroundColor: "crimson" }} name='group3' onClick={(e)=>handleClearBulkFilter(e)}>
              Truncate
            </button>
            <button className="btn" onClick={handleCancel}>Cancel</button>
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
            <button className="btn" style={{ backgroundColor: "crimson" }} name='group4' onClick={(e)=>handleClearBulkFilter(e)}>
              Truncate
            </button>
            <button className="btn" onClick={handleCancel}>Cancel</button>
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
            <button className="btn" style={{ backgroundColor: "crimson" }} name='group5' onClick={(e)=>handleClearBulkFilter(e)}>
              Truncate
            </button>
            <button className="btn" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default clearFilter;
