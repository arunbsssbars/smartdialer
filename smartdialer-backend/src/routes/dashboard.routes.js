import { Router } from 'express';
import {
    getDashboardDetails,
    getRealTimeAgents,
    getRealTimeAllAgents,
    agentPause,
    agentResume,
    getChannels,
    getPeers,
    manageFilters,
    clearCDR,
    clearFilter,
    updateDuration,
    restartDB,
    restartSwitch,
    rebootServer,
} from "../controllers/dashboard.controller.js"
// import {verifyJWT} from "../middlewares/auth.middleware.js"

const dashboardRouter = Router();

// router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

dashboardRouter.route("/").get(getDashboardDetails);
dashboardRouter.route("/agent-live").get(getRealTimeAgents);
dashboardRouter.route("/all-agent-live").get(getRealTimeAllAgents);
dashboardRouter.route("/agent-pause").post(agentPause);
dashboardRouter.route("/agent-resume").post(agentResume);
dashboardRouter.route("/show-channels").get(getChannels);
dashboardRouter.route("/show-peers").get(getPeers);
dashboardRouter.route("/manage-filters").get(manageFilters);    
dashboardRouter.route("/clear-cdr").get(clearCDR);
dashboardRouter.route("/clear-filter").get(clearFilter);
dashboardRouter.route("/update-duration").post(updateDuration);
dashboardRouter.route("/restart-db").get(restartDB);
dashboardRouter.route("/restart-switch").get(restartSwitch);
dashboardRouter.route("/reboot-server").get(rebootServer);

export default dashboardRouter