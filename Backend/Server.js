import express from "express";
import DbConnect  from "./Config/db.js";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import dotenv from "dotenv";


dotenv.config();


const app=express();
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

app.use(cors({
    origin:"*",
    methods:["PUT","POST","GET","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials:true,
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
DbConnect();
app.get("/",(req,res)=>{
    res.send(`<h1>Hello This is Rahul The Developer</h1>`);
})
app.use((req,res)=>{
    res.status(400).json({
        success:false,
        message:"Server issue is there"
    })
});
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server is started at ${PORT}`);
})



