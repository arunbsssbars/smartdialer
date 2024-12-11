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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardHome from "./Components/DashboardHome";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Login/> */}
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/show-channels" element={<ShowChannels />} />
            <Route path="/show-peers" element={<ShowPeers />} />
            <Route path="/manage-filters" element={<ManageFilters />} />
            <Route path="/clear-cdr" element={<ClearCDR />} />
            <Route path="/clear-filter" element={<ClearFilter />} />
            <Route path="/restart-db" element={<RestartDB />} />
            <Route path="/restart-switch" element={<RestartSwitch />} />
            <Route path="/reboot-server" element={<Reboot />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
