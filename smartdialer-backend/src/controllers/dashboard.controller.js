
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { executeQuery } from "../db/queryHandler.js";
import { exec } from 'child_process';
import { writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';


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
        const query = 'SELECT id, username, active, activitytime, status, lastnum, groups FROM sipusers order by username';
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
        const query = 'select * from sipusers where active= ? order by username';
        const [results] = await executeQuery(query, ['active']);
        const STARTtime = Math.floor(Date.now() / 1000); // Get current timestamp

        const responseData = results.map(row => {
            const jimmy = row.status === "busy" ? STARTtime - row.activitytime : 0;
            return `${row.username} : ${jimmy}`;
        });
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { responseData },
                    "Real Time All Agent Info Fetched successfully"
                )
            )
    } catch (error) {
        throw new ApiError(500, error?.message || "Internal Server Error")
    }
})


const agentPause = asyncHandler(async (req, res) => {
    // console.log('JWT Verified for Pausing Agent',req.user);
    const { id, toChangeStatus, currentStatus } = req.body;
    // console.log(await executeQuery('SHOW COLUMNS FROM sipusers LIKE "status"'));
    const query = "UPDATE sipusers SET active = ?, status = ?  WHERE id = ?";
    try {
        await executeQuery(query, [toChangeStatus, currentStatus, id]);
        const queryUpdatedRow = 'SELECT id, username, active, activitytime, status, lastnum, groups FROM sipusers WHERE id = ?';
        const [results] = await executeQuery(queryUpdatedRow, [id]);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { results },
                    "Agent Paused successfully"
                )
            )
    } catch (error) {
        throw new ApiError(500, error?.message || "Internal Server Error")
    }
})


const agentResume = asyncHandler(async (req, res) => {
    // console.log('JWT Verified for Resuming Agent',req.user);  

    const { id, toChangeStatus, currentStatus } = req.body;
    const query = 'UPDATE sipusers SET active = ?, status = ? WHERE id = ?';
    try {
        await executeQuery(query, [toChangeStatus, currentStatus, id]);
        const queryUpdatedRow = 'SELECT id, username, active, activitytime, status, lastnum, groups FROM sipusers WHERE id = ?';
        const [results] = await executeQuery(queryUpdatedRow, [id]);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { results },
                    "Agent Paused successfully"
                )
            )
    } catch (error) {
        throw new ApiError(500, error?.message || "Internal Server Error")
    }
})

const getChannels = asyncHandler(async (req, res) => {
    exec('sh ./src/shellscripts/show-channels.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script : ${error.message}`);
            return res.status(500).json({ error: 'Script execution failed', details: error.message });
        }
        if (stderr) {
            console.warn(`Script stderr : ${stderr}`);
        }
        console.log(`Script stdout : ${stdout}`);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { stdout },
                    "Channels details Fetched successfully"
                )
            )
    });
})

const getChannelsCount = asyncHandler(async (req, res) => {
    exec('sh ./src/shellscripts/count-channels.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script : ${error.message}`);
            return res.status(500).json({ error: 'Script execution failed', details: error.message });
        }
        if (stderr) {
            console.warn(`Script stderr : ${stderr}`);
        }
        console.log(`Script stdout : ${stdout}`);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { stdout },
                    "Channels Count Fetched successfully"
                )
            )
    });
})

const getPeers = asyncHandler(async (req, res) => {
    exec('sh ./src/shellscripts/show-peers.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return res.status(500).json({ error: 'Script execution failed', details: error.message });
        }

        if (stderr) {
            console.warn(`Script stderr: ${stderr}`);
        }

        console.log(`Script stdout: ${stdout}`);
        // res.status(200).json({ message: 'Script executed successfully', output: stdout });
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { stdout },
                    "Peers Details Fetched successfully"
                )
            )
    });
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

const manageFiltersSubmit = asyncHandler(async (req, res) => {
    const { filters } = req.body;
    const query = 'UPDATE filter SET type = ?, duration = ? WHERE name = ?';
    try {
        await executeQuery(query, [filters.filterType, filters.duration, filters.group]);
        const queryUpdatedRow = 'SELECT * from filter WHERE name = ?';
        const [results] = await executeQuery(queryUpdatedRow, [filters.group]);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { results },
                    "Filter Data submited successfully"
                )
            )
    } catch (error) {
        throw new ApiError(501, error?.message || "Internal Server Error")
    }
})

const clearCDR = asyncHandler(async (req, res) => {
    try {
        const query = 'TRUNCATE table cdrtable';
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

const clearFilter = asyncHandler(async (req, res) => {
    try {
        const query = 'SELECT * FROM filter_timer';
        const [results] = await executeQuery(query);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { results },
                    "clear Filter Data fetched successfully"
                )
            )
    } catch (error) {
        throw new ApiError(501, error?.message || "Internal Server Error")
    }
})

const updateDuration = asyncHandler(async (req, res) => {
    const { itemToBeUpdated } = req.body;
    const query = 'UPDATE filter_timer SET cleartime = ? WHERE id = ?';
    try {
        await executeQuery(query, [itemToBeUpdated.cleartime, itemToBeUpdated.id]);
        const queryUpdatedRow = 'SELECT * from filter_timer WHERE id = ?';
        const [results] = await executeQuery(queryUpdatedRow, [itemToBeUpdated.id]);
        console.log(results)
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { results },
                    `Duration for ${results[0].groups} updated successfully`
                )
            )
    } catch (error) {
        throw new ApiError(501, error?.message || "Internal Server Error")
    }
})
const clearBulkFilter = asyncHandler(async (req, res) => {
    const { groupName } = req.body;
    try {

        if (groupName === 'all') {
            const query = 'TRUNCATE table topgear';
            await executeQuery(query);
        } else {
            const query = 'delete from topgear where useragent= ?';
            await executeQuery(query, [groupName]);
        }
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { groupName },
                    `Clear filter for ${groupName} Executed successfully`
                )
            )
    } catch (error) {
        throw new ApiError(501, error?.message || "Internal Server Error")
    }
})


const restartDB = asyncHandler(async (req, res) => {
    exec('sh ./src/shellscripts/restart-db.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return res.status(500).json({ error: 'Script execution failed', details: error.message });
        }
        if (stderr) {
            console.warn(`Script stderr: ${stderr}`);
        }
        console.log(`Script stdout: ${stdout}`);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { stdout },
                    "DB Restarted successfully"
                )
            )
    });
})

const restartSwitch = asyncHandler(async (req, res) => {
    exec('sh ./src/shellscripts/restart-db.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return res.status(500).json({ error: 'Script execution failed', details: error.message });
        }

        if (stderr) {
            console.warn(`Script stderr: ${stderr}`);
        }

        console.log(`Script stdout: ${stdout}`);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { stdout },
                    "Switch Restarted successfully"
                )
            )
    });
})

const rebootServer = asyncHandler(async (req, res) => {

    // Get the directory name (for ES modules)
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Define the file path
    const myFile = path.join(__dirname, '../shellscripts/reboot.server');

    // Write to the file
    try {
        await writeFile(myFile, 'reboot requested');
        console.log("Processing Reboot Request....close your admin panel...TIMEOUT:60 secs");

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { myFile },
                    "Server Rebooted successfully"
                )
            )
    } catch (err) {
        console.error('Cannot open file:', err.message);
    }

})

export {
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
    rebootServer
}