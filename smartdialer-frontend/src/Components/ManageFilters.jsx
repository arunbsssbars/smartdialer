import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const ManageFilters = () => {
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
        <h2>Manager Filters</h2>
        <p>Realtime Call Connectivity and User Status Display</p>
      </div>
      <div className="contentContainer">
        <h2>Filter Manager</h2>
        <div className="filters">
          {/*<!-- Group Filter --> */}
          <label htmlFor="group">Select Group:</label>
          <select id="group">
            <option value="">Choose...</option>
            <option value="Group1">Group1</option>
            <option value="Group2">Group2</option>
            <option value="Group3">Group3</option>
            <option value="Group4">Group4</option>
            <option value="Group5">Group5</option>
            <option value="Group6">Group6</option>
            <option value="Group7">Group7</option>
            <option value="Group8">Group8</option>
          </select>

          {/* <!-- Filter Type --> */}
          <label htmlFor="filterType">Filter By:</label>
          <select id="filterType">
            <option value="">Choose...</option>
            <option value="CalleeID">CalleeID</option>
            <option value="CallerID">CallerID</option>
            <option value="Off">Off</option>
            <option value="both">both</option>
          </select>

          {/*<!-- Duration --> */}
          <label htmlFor="duration">Duration:</label>
          <select id="duration">
            <option value="">Choose...</option>
            <option value="1">1 min</option>
            <option value="2">2 mins</option>
            <option value="10">3 mins</option>
            <option value="10">4 mins</option>
            <option value="10">5 mins</option>
            <option value="10">10 mins</option>
            <option value="10">15 mins</option>
            <option value="10">20 mins</option>
            <option value="10">24 mins</option>
            <option value="10">48 mins</option>
            <option value="10">72 mins</option>
          </select>
          <input type="submit" className="btn" value="Submit"/>
        </div>
      </div>
      <div className="contentContainer">
        <h2>Existing Filter Details</h2>
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
                  <th>GROUPNAME</th>
                  <th>FILTER TYPE</th>
                  <th>DURATION(MINS)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.duration}</td>
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

export default ManageFilters;
