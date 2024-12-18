import "./App.css";
import Dashboard from "./Components/Dashboard";
import ShowChannels from "./Components/ShowChannels";
import ShowPeers from "./Components/ShowPeers";
import ManageFilters from "./Components/ManageFilters";
import ClearCDR from "./Components/ClearCDR";
import ClearFilter from "./Components/ClearFilter";
import RestartDB from "./Components/RestartDB";
import RestartSwitch from "./Components/RestartSwitch";
import Reboot from "./Components/Reboot";
import Login from "./Components/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardHome from "./Components/DashboardHome";
import LiveAgentsInfo from "./Components/LiveAgentsInfo";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  return (
    <>
        <Routes>           
          { !token ? <>
          <Route path='*' element={<Navigate to="/" replace/>}/>
          <Route path='/' element={
              <Login
              setToken={(t) => {
                setToken(t);
                localStorage.setItem("token", t);
                console.log("Value from set Token is: ", t);
              }}
              />
            }/></>
            :
            <> 
            <Route path="/" element={<Navigate to="/dashboard" />}/>
            <Route path="/dashboard" element={<Dashboard handleLogout={handleLogout}/>}>
              <Route index element={<DashboardHome />} />
              <Route path="/dashboard/show-channels" element={<ShowChannels />} />
              <Route path="/dashboard/show-peers" element={<ShowPeers />} />
              <Route path="/dashboard/manage-filters" element={<ManageFilters />} />
              <Route path="/dashboard/clear-cdr" element={<ClearCDR />} />
              <Route path="/dashboard/clear-filter" element={<ClearFilter />} />
              <Route path="/dashboard/restart-db" element={<RestartDB />} />
              <Route path="/dashboard/restart-switch" element={<RestartSwitch />} />
              <Route path="/dashboard/reboot-server" element={<Reboot />} />
              <Route path="/dashboard/agent-live" element={<LiveAgentsInfo />} />
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
