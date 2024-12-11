import { ImSwitch } from "react-icons/im";
import { LiaHourglassStartSolid } from "react-icons/lia";
import { BsBootstrap } from "react-icons/bs";
import { VscDebugRestart } from "react-icons/vsc";
import { GiCardDiscard } from "react-icons/gi";
import { AiOutlineClear } from "react-icons/ai";
import { SiPeerlist } from "react-icons/si";
import { CiFilter } from "react-icons/ci";
import { RiWechatChannelsFill } from "react-icons/ri";
import { LuLayoutDashboard } from "react-icons/lu";
import React from "react";
import { Link, Outlet } from "react-router-dom";
const Dashboard = () => {
  return (
    <>
      <div className="dashboardContainer">
        <header>
          <div className="dashboardHeading">
            <h1>Smart Premium Dashboard</h1>
            <p>Automatic AI Based Call Distribution App</p>
          </div>
          <button className="logoutBtn">
            <ImSwitch />
          </button>
        </header>
        <div className="dashboardBody">
          <nav className="dashboardController">
            <h2>Controls</h2>
            <div className="dashboardControls">
              <ul className="allControls">
                <li>
                  <Link to="/">
                    <LuLayoutDashboard />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/show-channels">
                    <RiWechatChannelsFill />
                    Show Channels
                  </Link>
                </li>
                <li>
                  <Link to="/show-peers">
                    <SiPeerlist />
                    Show Peers
                  </Link>
                </li>
                <li>
                  <Link to="/manage-filters">
                    <CiFilter />
                    Manage Filters
                  </Link>
                </li>
                <li>
                  <Link to="/clear-cdr">
                    {" "}
                    <GiCardDiscard />
                    Clear CDR
                  </Link>
                </li>
                <li>
                  <Link to="/clear-filter">
                    <AiOutlineClear />
                    Clear Filter
                  </Link>
                </li>
                <li>
                  <Link to="/restart-db">
                    <VscDebugRestart />
                    Restart DB
                  </Link>
                </li>
                <li>
                  <Link to="/restart-switch">
                    <LiaHourglassStartSolid />
                    Restart Switch
                  </Link>
                </li>
                <li>
                  <Link to="/reboot-server">
                    <BsBootstrap />
                    Reboot
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="dashboardContent">
            <div className="routeHeader">
              <h3>Realtime Callstats</h3>
              <p>Realtime Call Connectivity and User Status Display</p>
            </div>
            <div className="routeContent">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

