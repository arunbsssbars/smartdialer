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
import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
const Dashboard = ({handleLogout}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const hemRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !hemRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="dashboardContainer">
        <header>
        <div
        ref={hemRef}
        className={`hamburger-icon ${menuOpen ? "open" : ""}` }
        onClick={() => {setMenuOpen((prev) => !prev)}}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
          <div className="dashboardHeading">
            <h1>Smart Premium Dashboard</h1>
            <p>Automatic AI Based Call Distribution App</p>
          </div>
          <button className="logoutBtn" onClick={()=>handleLogout()}>
            <ImSwitch />
          </button>
        </header>
        <div className="dashboardBody">
          <nav className={`dashboardController  ${menuOpen ? "open" : ""}`} ref={menuRef}>
            <h2>Controls</h2>
            <div className="dashboardControls ">
              <ul className="allControls">
                <li>
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                    <LuLayoutDashboard />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/show-channels" onClick={() => setMenuOpen(false)}>
                    <RiWechatChannelsFill />
                    Show Channels
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/show-peers" onClick={() => setMenuOpen(false)}>
                    <SiPeerlist />
                    Show Peers
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-filters" onClick={() => setMenuOpen(false)}>
                    <CiFilter />
                    Manage Filters
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/clear-cdr" onClick={() => setMenuOpen(false)}>
                    <GiCardDiscard />
                    Clear CDR
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/clear-filter" onClick={() => setMenuOpen(false)}>
                    <AiOutlineClear />
                    Clear Filter
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/restart-db" onClick={() => setMenuOpen(false)}>
                    <VscDebugRestart />
                    Restart DB
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/restart-switch" onClick={() => setMenuOpen(false)}>
                    <LiaHourglassStartSolid />
                    Restart Switch
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/reboot-server" onClick={() => setMenuOpen(false)}>
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
