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
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardHome from "./Components/DashboardHome";
import LiveAgentsInfo from "./Components/LiveAgentsInfo";

function App() {
  return (
    <>
      <BrowserRouter>
        <Login/>
        {/* <Routes>
          <Route path="/" element={<Navigate to='/dashboard' replace/>}/>
          <Route path="/dashboard" element={<Dashboard />}>
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
          </Route>
        </Routes> */}
      </BrowserRouter>
    </>
  );
}

export default App;
