import {getPool} from './index.js';

/**
 * Execute a query on the database.
 * @param {string} query - The SQL query string.
 * @param {Array} params - The query parameters (optional).
 * @returns {Promise} - Resolves to the query result.
 */
export const executeQuery = async (query, params = []) => {
  let connection;
  try {
    // connection = await createDBPool.getConnection();
    // Get a connection from the pool
    const pool = await getPool();
    connection = await pool.getConnection();
    // Execute the query
    const results = await connection.execute(query, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    // Release the connection back to the pool
    if (connection) connection.release();//poolConnection.release(connection);
  }
};
