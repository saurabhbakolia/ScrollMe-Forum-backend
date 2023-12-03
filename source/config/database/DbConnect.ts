import mongoose from "mongoose";
import { getErrorMessage } from "../../utils/errors/getErrorMessage";
const MONGODB_URI: string = process.env.DB_CONNECTION_STRING || "mongodb://0.0.0.0:27017/scrollme-forum";

const dbConnect = () => {
    try {
        mongoose.connect(MONGODB_URI)
            .then(() => {
                console.log("Connected to MongoDB");
            })
            .catch((error) => {
                console.log("Error connecting to MongoDB", error.message);
            });
    } catch (error) {
        console.log("Error connecting to MongoDB", getErrorMessage(error));
    }

};

export default dbConnect