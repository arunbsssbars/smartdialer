import React, { useEffect, useState } from "react";
import axios from "axios";

const AllAgentLive = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("false");
  useEffect(() => {
    getAllLiveAgentsInfo();
  }, []);

  const getAllLiveAgentsInfo = () => {
    setLoading(true);
    axios
      .get("/api/dashboard/all-agent-live")
      .then(function (response) {
        setData(response.data.data.responseData);
        console.log(response.data.data.responseData);
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

  const renderRows = () => {
    const rows = [];
    // Split agents into rows of 10
    for (let i = 0; i < data.length; i += 10) {
      const row = data
        .slice(i, i + 10)
        .map((item, index) => <td key={index}>{item}</td>);
      rows.push(<tr key={i}>{row}</tr>);
    }
    return rows;
  };

  return (
    <div className="mainContainer">
      <div className="contentContainer">
        <h2>Agent Information</h2>
        <div className="tableData">
          <table>
            <thead>
              {/* Render column headers */}
              <tr>
                {[...Array(10)].map((_, i) => (
                  <th key={i}>{i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>{renderRows()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllAgentLive;
