import { Router } from 'express';
import {
    getDashboardDetails,
    getRealTimeAgents,
    getRealTimeAllAgents,
    agentPause,
    agentResume,
    getChannels,    
    getChannelsCount,
    getPeers,
    manageFilters,
    manageFiltersSubmit,
    clearCDR,
    clearFilter,
    updateDuration,
    clearBulkFilter,
    restartDB,
    restartSwitch,
    rebootServer,
} from "../controllers/dashboard.controller.js"
import { verifyJWT } from '../middlewares/auth.middleware.js';
// import {verifyJWT} from "../middlewares/auth.middleware.js"

const dashboardRouter = Router();

// router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

dashboardRouter.route("/").get(getDashboardDetails);
dashboardRouter.route("/agent-live").get(getRealTimeAgents);
dashboardRouter.route("/all-agent-live").get(getRealTimeAllAgents);
dashboardRouter.route("/agent-pause").post(verifyJWT, agentPause);
dashboardRouter.route("/agent-resume").post(verifyJWT,agentResume);
dashboardRouter.route("/show-channels").get(getChannels);
dashboardRouter.route("/count-channels").get(getChannelsCount);
dashboardRouter.route("/show-peers").get(getPeers);
dashboardRouter.route("/manage-filters").get(manageFilters);    
dashboardRouter.route("/manage-filters-submit").post(manageFiltersSubmit);    
dashboardRouter.route("/clear-cdr").post(verifyJWT, clearCDR);
dashboardRouter.route("/clear-filter").get(clearFilter);
dashboardRouter.route("/update-duration").post(verifyJWT,updateDuration);
dashboardRouter.route("/clear-Bulk-Filter").post(verifyJWT,clearBulkFilter);
dashboardRouter.route("/restart-db").post(verifyJWT, restartDB);
dashboardRouter.route("/restart-switch").post(verifyJWT, restartSwitch);
dashboardRouter.route("/reboot-server").post(verifyJWT, rebootServer);

export default dashboardRouter