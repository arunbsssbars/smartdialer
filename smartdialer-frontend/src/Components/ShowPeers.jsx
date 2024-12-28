import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const ShowPeers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {    
    setLoading(true);
    // Initial call
    getPeersInfo();

    // Set up interval
    const intervalId = setInterval(() => {
      getPeersInfo();
    }, 5000);

    // Clean up on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const getPeersInfo = () => {
    axios
      .get("/api/dashboard/show-peers")
      .then(function (response) {
        setData(response.data.data.stdout);
        console.log(response.data.data.stdout);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      }).finally(function () {
        // always executed
        setLoading(false);
      });;
  };
  return (
    <div className="mainContainer">
      <div className="contentContainer">
        <h2>Show Call Peers</h2>
        <p>Realtime Call Connectivity and User Status Display</p>
      </div>
      <div className="contentContainer">
        <h2>Peer Information</h2>
        {loading ? (
          <h1 style={{ margin: " 10rem", background: "transparent" }}>
            Loading...
          </h1>
        ) : (
          <div className="tableData">
            {data}
            {/*             <table>
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
            </table> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowPeers;
