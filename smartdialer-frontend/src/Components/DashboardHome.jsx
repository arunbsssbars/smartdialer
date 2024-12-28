import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import LiveAgentsInfo from "./AgentLive";

const DashboardHome = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("true");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("/api/dashboard")
      .then(function (response) {
        setData(response.data.data.results);
        console.log(response.data.data.results);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  return (
    <div className="mainContainer">
      <div className="contentContainer">
        <h2>Realtime Callstats</h2>
        <p>Realtime Call Connectivity and User Status Display</p>
      </div>
      <div className="contentContainer">
        <h2>Online Agent Info</h2>
        {loading ? (
          <h1 style={{ margin: " 10rem", background: "transparent" }}>
            Loading...
          </h1>
        ) : (
          <div className="tableData">
            <table>
              <thead>
                <tr>
                  <th>Group</th>
                  <th>Active Count</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.groups}</td>
                    <td>{item.ActiveCount}</td>
                    <td>{item.active}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="btnContainer">
          <Link to="/dashboard/agent-live">
            <button className="btn"> Realtime Agent Information</button>
          </Link>
          <Link to="/dashboard/all-agent-live">
            <button className="btn"> Live Agent Compact View</button>
          </Link>
        </div>
      </div>
      <div className="contentContainer">
        <h2>Call Distribution</h2>
        <div className="tableData">
          <table>
            <thead>
              <tr>
                <th>Total Calls</th>
                <th>Allowed</th>
                <th>Up</th>
                <th>Setup</th>
                <th>Forward</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>80</td>
                <td>60</td>
                <td>50</td>
                <td>10</td>
                <td>20</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="btnContainer">
          <Link to='/dashboard'>
            <button className="btn"> Map Call Controls</button>
          </Link>
          <Link to='/dashboard/count-channels'>
            <button className="btn"> Calls from Provider</button>
          </Link>
        </div>
      </div>
      <div className="contentContainer">
        <h2>Hardware Information</h2>
        <div className="hardwareInfo">
          <p>Architecture: x86_64</p>
          <p>CPU op-mode(s): 32-bit, 64-bit</p>
          <p>Byte Order: Little Endian</p>
          <p>CPU(s): 8</p>
          <p>On-line CPU(s) list: 0-7</p>
          <p>Thread(s) per core: 2</p>
          <p>Core(s) per socket: 4</p>
          <p>Socket(s): 1</p>
          <p>Vendor ID: GenuineIntel</p>
          <p>CPU family: 6</p>
          <p>Model: 158</p>
          <p>Model name: Intel(R) Xeon(R) CPU E3-1275 v6 @ 3.80GHz</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
