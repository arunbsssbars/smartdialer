import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { Link } from "react-router";
import { ToastContainer, toast } from "react-toastify";
const AgentLive = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    // Initial call
    setLoading(true);
    getLiveAgentsInfo();

    // Set up interval
    const intervalId = setInterval(() => {
      getLiveAgentsInfo();
    }, 5000);

    // Clean up on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const getLiveAgentsInfo = () => {
    axios
      .get("/api/dashboard/agent-live")
      .then(function (response) {
        setData(response.data.data.results);
        // navigate('/agent-live')
        console.log(response.data.data.results);
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

  const handleAction = async (id, status) => {
    try {
      //backend response will send an updated row data
      const response =
        status === "active"
          ? await axios.post(
              "/api/dashboard/agent-pause",
              { id, toChangeStatus: "inactive", currentStatus: "paused" },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
          : await axios.post(
              "/api/dashboard/agent-resume",
              { id, toChangeStatus: "active", currentStatus: "free" },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
      console.log("Action button clicked", response.data.data.results[0]);
      // Update the task status locally
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, ...response.data.data.results[0] } : item
        )
      );
      if (response.status === 200) {
        // alert(`Agent with User Name ${response.data.data.results[0].username} is being ${status==="active" ? "paused" : "resumed"} successfully`);
        toast.success(
          `Agent ${response.data.data.results[0].username} ${
            status === "active" ? "paused" : "resumed"
          } successfully`
        );
      }
    } catch (error) {
      console.log(
        `Error in ${status === "active" ? "pausing" : "resuming"} the agent`,
        error
      );
      toast.error(
        `Error in ${status === "active" ? "pausing" : "resuming"} the agent ${
          response.data.data.results[0].username
        }`
      );
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="mainContainer">
        <div className="contentContainer">
          <h2>Live Agents</h2>
          <p>Realtime Call Connectivity and User Status Display</p>
        </div>
        <div className="btnContainer">
          <Link to="/dashboard/agent-live" isActive:true isPending:true>
            <button className="btn"> Realtime Agent Information</button>
          </Link>
          <Link to="/dashboard/all-agent-live" isActive:true isPending:true>
            <button className="btn"> Live Agent Compact View</button>
          </Link>
        </div>
        <div className="contentContainer">
          <h2>Realtime Agent Information</h2>
          {loading ? (
            <Spinner />
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
                    <th>ACTION</th>
                    {/* <th>ACTION RESUME</th> */}
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
                        <button
                          className="btn"
                          style={{
                            background:
                              item.active === "active"
                                ? " rgb(152, 12, 40)"
                                : "",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "80%",
                            padding: ".8rem",
                            margin: "auto",
                          }}
                          onClick={() => {
                            handleAction(item.id, item.active);
                          }}
                        >
                          {item.active === "active" ? "PAUSE" : "RESUME"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AgentLive;
