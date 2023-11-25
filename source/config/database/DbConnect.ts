import mongoose from "mongoose";
const MONGODB_URI: string = process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/scrollme-forum";

const dbConnect = () => {
    mongoose.connect(MONGODB_URI)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((error) => {
            console.log("Error connecting to MongoDB", error.message);
        });
};

export default dbConnect