import mongoose from "mongoose";
import { dbName } from '../constants.js'

export const connectDB = async () => {

    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`MongoDB Connected : ${connectionInstance.connection.host}`);
    } catch (error) {
        throw error
    }

}