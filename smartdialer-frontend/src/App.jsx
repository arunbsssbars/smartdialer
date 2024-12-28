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
import { useState } from "react";
import AllAgentLive from "./Components/AllAgentLive";
import RebootServer from "./Components/RebootServer";
import ShowChannelsCount from "./Components/ShowChannelsCount";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [tokenExpiry, setTokenExpiry] = useState(localStorage.getItem('tokenExpiry') || null);
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setTokenExpiry(null);
    localStorage.removeItem("tokenExpiry");
  };

  const handleSession = () => {
    console.log('HandleSession Set Timeout started at ' + Date());    
    setTimeout(() => {
      alert("Your session will expire in 10 minutes.");
    }, tokenExpiry * 1000 - Date.now() - 10 * 60 * 1000);
    console.log('HandleSession Set Timeout set at ' + Date());  
    setTimeout(() => {
      alert("Your session has expired. Please login again");
      setToken(null);
      localStorage.removeItem("token");
      setTokenExpiry(null);
      localStorage.removeItem("tokenExpiry");
    }, tokenExpiry * 1000 - Date.now());
  };
  

  return (
    <>
        <Routes>           
          { !token ? <>
          <Route path='*' element={<Navigate to="/" replace/>}/>
          <Route path='/' element={
              <Login
              setToken={setToken} setTokenExpiry={setTokenExpiry}
              />
            }/></>
            :
            <> 
            <Route path="/" element={<Navigate to="/dashboard" />}/>
            <Route path="/dashboard" element={<Dashboard handleLogout={handleLogout} handleSession={handleSession}/>}>
              <Route index element={<DashboardHome />} />
              <Route path="/dashboard/show-channels" element={<ShowChannels />} />
              <Route path="/dashboard/count-channels" element={<ShowChannelsCount />} />
              <Route path="/dashboard/show-peers" element={<ShowPeers />} />
              <Route path="/dashboard/manage-filters" element={<ManageFilters />} />
              <Route path="/dashboard/clear-cdr" element={<ClearCDR />} />
              <Route path="/dashboard/clear-filter" element={<ClearFilter />} />
              <Route path="/dashboard/restart-db" element={<RestartDB />} />
              <Route path="/dashboard/restart-switch" element={<RestartSwitch />} />
              <Route path="/dashboard/reboot-server" element={<RebootServer />} />
              <Route path="/dashboard/agent-live" element={<AgentLive />} />
              <Route path="/dashboard/all-agent-live" element={< AllAgentLive />} />
              <Route path="*" element={<h1 style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>Error 404: Page Not Found</h1>} />
            </Route>
            <Route path="*" element={<h1 style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>Error 404: Page Not Found</h1>} />
            </>
        }
        </Routes> 
    </>
  );
}

export default App;
