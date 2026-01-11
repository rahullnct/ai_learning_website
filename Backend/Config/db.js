import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const DbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("Database Connectivity is Succesfully");
    })
    .catch((error)=>{
        console.log("database connectivity error:",error);
        process.exit(1);
    })
};
export default DbConnect;

