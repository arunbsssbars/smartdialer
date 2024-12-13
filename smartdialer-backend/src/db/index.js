import mysql from 'mysql2/promise';
import { DB_NAME } from "../constants.js";


/* Function to create the connection pool */
let pool;
export const connectDB = async () => {
  try {
    // create the pool   
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: `${DB_NAME}`,
    });

    const connection = await pool.getConnection();
    console.log(`\n MYSQL pool created !! DB Host is: ${connection.config.host} and Running at Port: ${connection.config.port} \n`);
    pool.releaseConnection(connection);//connection.release();
    return pool;
  } catch (error) {
    console.log("MYSQL connection FAILED ", error);
    process.exit(1)
  }
}

/* Funtion to export pool for routes for DB Query*/
export const getPool = async () => {
  if (!pool) {
    throw new Error('Database pool is not initialized. Ensure initializePool is called first.');
  }
  return pool;
};



