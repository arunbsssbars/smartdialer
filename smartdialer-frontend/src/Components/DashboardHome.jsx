import React from "react";

const DashboardHome = () => {
  return (
    <div className="dashboardHome">
      <div className="tableContainer">
        <h2>Online Agent Info</h2>
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
              <tr>
                <td>group1</td>
                <td>54</td>
                <td>Inactive</td>
              </tr>
              <tr>
                <td>group1</td>
                <td>1</td>
                <td>free</td>
              </tr>
              <tr>
                <td>group2</td>
                <td>50</td>
                <td>Inactive</td>
              </tr>
              <tr>
                <td>group3</td>
                <td>50</td>
                <td>Inactive</td>
              </tr>
              <tr>
                <td>group4</td>
                <td>50</td>
                <td>Inactive</td>
              </tr>
              <tr>
                <td>group5</td>
                <td>50</td>
                <td>Inactive</td>
              </tr>
              <tr>
                <td>group6</td>
                <td>50</td>
                <td>Inactive</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="tableContainer">
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
      </div>
      <div className="tableContainer">
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
