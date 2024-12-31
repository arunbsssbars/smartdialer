import "./App.css";
import Dashboard from "./Components/Dashboard";
import ShowChannels from "./Components/ShowChannels";
import ShowPeers from "./Components/ShowPeers";
import ManageFilters from "./Components/ManageFilters";
import ClearCDR from "./Components/ClearCDR";
import ClearFilter from "./Components/ClearFilter";
import RestartDB from "./Components/RestartDB";
import RestartSwitch from "./Components/RestartSwitch";
import Login from "./Components/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardHome from "./Components/DashboardHome";
import AgentLive from "./Components/AgentLive";
import { useState, useEffect } from "react";
import AllAgentLive from "./Components/AllAgentLive";
import RebootServer from "./Components/RebootServer";
import ShowChannelsCount from "./Components/ShowChannelsCount";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [tokenExpiry, setTokenExpiry] = useState(
    localStorage.getItem("tokenExpiry") || null
  );

  useEffect(() => {
    handleSession();
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setTokenExpiry(null);
    localStorage.removeItem("tokenExpiry");
  };

  const handleSession = () => {
    if (token) {
      const expirationTime = tokenExpiry * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      const timeUntilExpiration = expirationTime - currentTime;
  
      if (timeUntilExpiration > 0) {
        const alertTime = timeUntilExpiration - 10 * 60 * 1000; // 10 minutes before expiration
  
        // Set alert for session expiration
        const alertTimeout = setTimeout(() => {
          const minutesLeft = timeUntilExpiration >= 10 * 60 * 1000 
            ? 10 
            : (timeUntilExpiration / (60 * 1000)).toFixed(2);
          alert(
            `Your session will expire in ${minutesLeft} minute(s). Please save your work.`
          );
        }, Math.max(0, alertTime)); // Ensure timeout is non-negative
  
        // Set logout at expiration
        const logoutTimeout = setTimeout(() => {
          alert("Your session has expired. Please login...");
          handleLogout();
        }, timeUntilExpiration);
  
        // Cleanup timeouts
        return () => {
          clearTimeout(alertTimeout);
          clearTimeout(logoutTimeout);
        };
      } else {
        handleLogout(); // If the token is already expired
      }
    }
  };
  
  return (
    <>
      <Routes>
        {!token ? (
          <>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route
              path="/"
              element={
                <Login setToken={setToken} setTokenExpiry={setTokenExpiry} />
              }
            />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route
              path="/dashboard"
              element={<Dashboard handleLogout={handleLogout} />}
            >
              <Route index element={<DashboardHome />} />
              <Route
                path="/dashboard/show-channels"
                element={<ShowChannels />}
              />
              <Route
                path="/dashboard/count-channels"
                element={<ShowChannelsCount />}
              />
              <Route path="/dashboard/show-peers" element={<ShowPeers />} />
              <Route
                path="/dashboard/manage-filters"
                element={<ManageFilters />}
              />
              <Route path="/dashboard/clear-cdr" element={<ClearCDR />} />
              <Route path="/dashboard/clear-filter" element={<ClearFilter />} />
              <Route path="/dashboard/restart-db" element={<RestartDB />} />
              <Route
                path="/dashboard/restart-switch"
                element={<RestartSwitch />}
              />
              <Route
                path="/dashboard/reboot-server"
                element={<RebootServer />}
              />
              <Route path="/dashboard/agent-live" element={<AgentLive />} />
              <Route
                path="/dashboard/all-agent-live"
                element={<AllAgentLive />}
              />
              <Route
                path="*"
                element={
                  <h1
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100vh",
                    }}
                  >
                    Error 404: Page Not Found
                  </h1>
                }
              />
            </Route>
            <Route
              path="*"
              element={
                <h1
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                  }}
                >
                  Error 404: Page Not Found
                </h1>
              }
            />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
