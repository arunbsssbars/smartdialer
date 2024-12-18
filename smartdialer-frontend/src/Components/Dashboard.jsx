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
const Dashboard = ({handleLogout}) => {


  return (
    <>
      <div className="dashboardContainer">
        <header>
          <div className="dashboardHeading">
            <h1>Smart Premium Dashboard</h1>
            <p>Automatic AI Based Call Distribution App</p>
          </div>
          <button className="logoutBtn" onClick={()=>handleLogout()}>
            <ImSwitch />
          </button>
        </header>
        <div className="dashboardBody">
          <nav className="dashboardController">
            <h2>Controls</h2>
            <div className="dashboardControls">
              <ul className="allControls">
                <li>
                  <Link to="/dashboard">
                    <LuLayoutDashboard />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/show-channels">
                    <RiWechatChannelsFill />
                    Show Channels
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/show-peers">
                    <SiPeerlist />
                    Show Peers
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-filters">
                    <CiFilter />
                    Manage Filters
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/clear-cdr">
                    <GiCardDiscard />
                    Clear CDR
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/clear-filter">
                    <AiOutlineClear />
                    Clear Filter
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/restart-db">
                    <VscDebugRestart />
                    Restart DB
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/restart-switch">
                    <LiaHourglassStartSolid />
                    Restart Switch
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/reboot-server">
                    <BsBootstrap />
                    Reboot
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <div className="dashboardContent">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
