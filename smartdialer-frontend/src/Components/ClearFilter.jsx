import React from 'react'
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
                  <td><input id='updateDuration' type='text' value={item.duration}></input></td>
                  <td><button className='btn'>Update</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
  )
}

export default clearFilter;