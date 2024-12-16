import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const LiveAgentsInfo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("true");
  useEffect(() => {
    getLiveAgentsInfo();
  }, []);

  const getLiveAgentsInfo = () => {
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
      });
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
                  <th>ACTION PAUSE</th>
                  <th>ACTION RESUME</th>
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
                      <button className="btn">PAUSE</button>
                    </td>
                    <td>
                      <button className="btn">RESUME</button>
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

export default LiveAgentsInfo;
