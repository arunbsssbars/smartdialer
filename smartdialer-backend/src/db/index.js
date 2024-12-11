// import mongoose from "mongoose";
import mysql from "mysql";
import { DB_NAME } from "../constants.js";


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: `${DB_NAME}`
});
try {
connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }    
        console.log('connected as id ' + connection.threadId);
    });
} catch (error) {
    console.error('SQL DB failed to connect' + error);
}

export default connection