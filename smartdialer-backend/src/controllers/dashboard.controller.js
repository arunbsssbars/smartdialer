
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { executeQuery } from "../db/queryHandler.js";

/* Pending Query for Call Distribution */
const getDashboardDetails = asyncHandler(async (req, res) => {
    try {
        /* Query for online Agent Info */
        const query = 'SELECT groups, COUNT(status) as ActiveCount, active FROM sipusers GROUP BY groups, active';
        /* Query pending for Call Distribution */
        // const query = 'SELECT groups, COUNT(status) as ActiveCount, active FROM sipusers GROUP BY groups, active';

        const [results] = await executeQuery(query);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { results },
                    "Online Agent Info Fetched successfully"
                )
            )
    } catch (error) {
        throw new ApiError(501, error?.message || "Internal Server Error")
    }
})
const getRealTimeAgents = asyncHandler(async (req, res) => {
    try {
        const query = 'SELECT id, username, active, activitytime, status, lastnum, groups FROM sipusers';
        const [results] = await executeQuery(query);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { results },
                    "Real Time Agent Info Fetched successfully"
                )
            )
    } catch (error) {
        throw new ApiError(500, error?.message || "Internal Server Error")
    }
})
/*Query  Pending for All Live Agents */
const getRealTimeAllAgents = asyncHandler(async (req, res) => {
    try {
        const query = 'SELECT id, username, active, activitytime, status, lastnum, groups FROM sipusers';
        const [results] = await executeQuery(query);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { results },
                    "Real Time All Agent Info Fetched successfully"
                )
            )
    } catch (error) {
        throw new ApiError(500, error?.message || "Internal Server Error")
    }
})
/*Query Pending for Show Channels */
const getChannels = asyncHandler(async (req, res) => {
    try {
        const query = 'SELECT id, username, active, activitytime, status, lastnum, groups FROM sipusers';
        const [results] = await executeQuery(query);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { results },
                    "Channels details Fetched successfully"
                )
            )
    } catch (error) {
        throw new ApiError(500, error?.message || "Internal Server Error")
    }
})
/* Query Pending for Show Peers */
const getPeers = asyncHandler(async (req, res) => {
    try {
        const query = 'SELECT * FROM sipusers';
        const [results] = await executeQuery(query);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { results },
                    "Peers Details Fetched successfully"
                )
            )
    } catch (error) {
        throw new ApiError(501, error?.message || "Internal Server Error")
    }
})
const manageFilters = asyncHandler(async (req, res) => {
    try {
        const query = 'SELECT * FROM filter';
        const [results] = await executeQuery(query);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { results },
                    "Filter Data Fetched successfully"
                )
            )
    } catch (error) {
        throw new ApiError(501, error?.message || "Internal Server Error")
    }
})
/* Query Pending for Clear CDR */
const clearCDR = asyncHandler(async (req, res) => {
    try {
        const query = 'SELECT * FROM sipusers';
        const [results] = await executeQuery(query);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { results },
                    "Clear CDR Executed successfully"
                )
            )
    } catch (error) {
        throw new ApiError(501, error?.message || "Internal Server Error")
    }
})
/* Query Pending for Clear filter */
const clearFilter = asyncHandler(async (req, res) => {
    try {
        const query = 'SELECT * FROM filter';
        const [results] = await executeQuery(query);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { results },
                    "Clear filter Executed successfully"
                )
            )
    } catch (error) {
        throw new ApiError(501, error?.message || "Internal Server Error")
    }
})
/* Query Pending for restartDB */
const restartDB = asyncHandler(async (req, res) => {
    try {
        const query = 'SELECT * FROM sipusers';
        const [results] = await executeQuery(query);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { results },
                    "DB Restarted successfully"
                )
            )
    } catch (error) {
        throw new ApiError(501, error?.message || "Internal Server Error")
    }
})
/* Query Pending for restartSwitch */
const restartSwitch = asyncHandler(async (req, res) => {
    try {
        const query = 'SELECT * FROM sipusers';
        const [results] = await executeQuery(query);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { results },
                    "Switch Restarted successfully"
                )
            )
    } catch (error) {
        throw new ApiError(501, error?.message || "Internal Server Error")
    }
})
/* Query Pending for rebootServer */
const rebootServer = asyncHandler(async (req, res) => {
    try {
        const query = 'SELECT * FROM sipusers';
        const [results] = await executeQuery(query);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { results },
                    "Server Rebooted successfully"
                )
            )
    } catch (error) {
        throw new ApiError(501, error?.message || "Internal Server Error")
    }
})

export {
    getDashboardDetails,
    getRealTimeAgents,
    getRealTimeAllAgents,
    getChannels,
    getPeers,
    manageFilters,
    clearCDR,
    clearFilter,
    restartDB,
    restartSwitch,
    rebootServer
}