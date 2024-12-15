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
    <div className="tableContainer">
      <h2>Live Agents</h2>
      {loading ? (
        <h1 style={{ margin: " 10rem", background: "transparent" }}>
          Loading...
        </h1>
      ) : (
        <div className="tableData">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>User Name</th>
                <th>Acivity</th>
                <th>Status</th>
              </tr>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.active}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </thead>
            <tbody></tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LiveAgentsInfo;
