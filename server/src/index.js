import mongoose from "mongoose";
import { connectDB } from './db/index.js'
import dotenv from 'dotenv'
import { app } from './app.js'
dotenv.config({ path: "./env" })
connectDB()
    .then(() => {
        app.listen(`${process.env.PORT || 8000}`, () => {
            console.log("App is listening at PORT", `${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("Error Occur while listening", err);
    })