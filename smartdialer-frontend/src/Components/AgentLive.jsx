import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const AgentLive = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("false");
  useEffect(() => {
    getLiveAgentsInfo();
  }, []);

  const getLiveAgentsInfo = () => {
    setLoading(true);
    axios
      .get("/api/dashboard/agent-live")
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

  const handleAction = async (id, status) => {
    const token = localStorage.getItem("token");  
    try {
      //backend response will send an updated row data
      const response =
        status === "active"
          ? await axios.post("/api/dashboard/agent-pause", { id, toChangeStatus: "inactive", currentStatus:'paused' }, {
            headers: {
              'Authorization': `Bearer ${token}`
          }})
          : await axios.post("/api/dashboard/agent-resume", { id, toChangeStatus: "active", currentStatus:'free' }, {
            headers: {
              'Authorization': `Bearer ${token}`
          }});
      console.log("Action button clicked", response.data.data.results[0]);
      // Update the task status locally
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, ...response.data.data.results[0]} : item
        )
      );
      if(response.status === 200){
        alert(`Agent with User Name ${response.data.data.results[0].username} is being ${status==="active" ? "paused" : "resumed"} successfully`);
      }
    } catch (error) {
      console.log(
        `Error in ${status === "active" ? "pausing" : "resuming"} the agent`,
        error
      );
    }
  };

  
  return (
    <div className="mainContainer">
      <div className="contentContainer">
        <h2>Live Agents</h2>
        <p>Realtime Call Connectivity and User Status Display</p>
      </div>
      <div className="contentContainer">
        <h2>Agent Information</h2>
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
                  <th>USER NAME</th>
                  <th>ACTIVITY</th>
                  <th>DURATION</th>
                  <th>CURRENT STATUS</th>
                  <th>LASTNUMBER GROUP</th>
                  <th>GROUP</th>
                  <th>ACTION</th>
                  {/* <th>ACTION RESUME</th> */}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.active}</td>
                    <td>{item.activitytime}</td>
                    <td>{item.status}</td>
                    <td>{item.lastnum}</td>
                    <td>{item.groups}</td>
                    <td>
                      <button
                        className="btn" style={{background:item.active==='active'? 'crimson' : '', display:'flex',justifyContent:'center', width:'90%', padding: '.8rem'}}
                        onClick={() => {
                          handleAction(item.id, item.active);
                        }}
                      >
                        {item.active === "active" ? "PAUSE" : "RESUME"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentLive;
