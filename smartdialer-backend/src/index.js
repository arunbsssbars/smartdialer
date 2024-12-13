// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import { app } from './app.js'
import { connectDB } from "./db/index.js"
dotenv.config({
    path: './.env'
})

/* Starting server on promise of DB pool creation */
connectDB().then(() => {
    app.listen(process.env.PORT || 8000, () => {
    console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Server Failed to start: ", err);
})