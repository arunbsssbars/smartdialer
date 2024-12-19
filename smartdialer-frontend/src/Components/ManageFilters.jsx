import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const ManageFilters = () => {
  const [initialData, setInitialData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState("true");
  const [filters, setFilters] = useState({
    group: "",
    filterType: "",
    duration: "",
  });
  
  useEffect(() => {
    getManageFilter();   
  }, []);

  const getManageFilter = () => {
    axios
      .get("/api/dashboard/manage-filters")
      .then(function (response) {
        setInitialData(response.data.data.results);
        setFilteredData(response.data.data.results);
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

  // Handle form input changes
  const handleChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Apply filters
    const filtered = initialData.filter((item) => {
      const matchesGroup = !filters.group || item.name === filters.group;
      const matchesFilterType =
        !filters.filterType || item.type === filters.filterType;
      const matchesDuration =
        !filters.duration || item.duration === filters.duration;

      return matchesGroup && matchesFilterType && matchesDuration;     
    });
    console.log(filtered);
    setFilteredData(filtered);
  };

  return (
    <div className="mainContainer">
      <div className="contentContainer">
        <h2>Manager Filters</h2>
        <p>Realtime Call Connectivity and User Status Display</p>
      </div>
      <div className="contentContainer">
        <h2>Filter Manager</h2>
        <form onSubmit={(e) => handleSubmit(e)} className="filters">
          {/*<!-- Group Filter --> */}
          <label htmlFor="group">Select Group:</label>
          <select
            id="group"
            name="group"
            value={filters.group}
            onChange={(e) => handleChange(e)}
          >
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
          <select
            id="filterType"
            name="filterType"
            value={filters.filterType}
            onChange={(e) => handleChange(e)}
          >
            <option value="">Choose...</option>
            <option value="CalleeID">CalleeID</option>
            <option value="CallerID">CallerID</option>
            <option value="Off">Off</option>
            <option value="both">both</option>
          </select>

          {/*<!-- Duration --> */}
          <label htmlFor="duration">Duration:</label>
          <select
            id="duration"
            name="duration"
            value={filters.duration}
            onChange={(e) => handleChange(e)}
          >
            <option value="">Choose...</option>
            <option value="1">1 min</option>
            <option value="2">2 mins</option>
            <option value="3">3 mins</option>
            <option value="4">4 mins</option>
            <option value="5">5 mins</option>
            <option value="10">10 mins</option>
            <option value="15">15 mins</option>
            <option value="20">20 mins</option>
            <option value="24">24 mins</option>
            <option value="48">48 mins</option>
            <option value="72">72 mins</option>
          </select>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
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
                {filteredData.map((item, index) => (
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
