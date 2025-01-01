import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { toast, ToastContainer } from "react-toastify";

const ShowChannels = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {    
    setLoading(true);
     // Initial call
     getChannelsInfo();

     // Set up interval
     const intervalId = setInterval(() => {
      getChannelsInfo();
     }, 5000);
 
     // Clean up on component unmount
     return () => clearInterval(intervalId);
  }, []);

  const getChannelsInfo = () => {
    axios
      .get("/api/dashboard/show-channels")
      .then(function (response) {
        setData(response.data.data.stdout);
        console.log(response.data.data.stdout);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        toast.error(`${error.message}`);
      }).finally(function () {
        // always executed
        setLoading(false);
      });
  };
  return (
    <div className="mainContainer">
      <ToastContainer/>
      <div className="contentContainer">
        <h2>Show Channels</h2>
        <p>Realtime Call Connectivity and User Status Display</p>
      </div>
      <div className="contentContainer">
        <h2>Channel Information</h2>
        {loading ? (
         <Spinner/>
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

export default ShowChannels;
