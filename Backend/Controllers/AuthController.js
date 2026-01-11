import User from "../Models/User";
import jwt from "jsonwebtoken";

const generatetoken=(id)=>{
 return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRES || "3d"
 })
}

export const register=(req,res,next)=>{
    try{

    }catch(err){
        next(err);
    }
};
export const login=(req,res,next)=>{
    try{

    }catch(err){
        next(err);
    }
};
export const getprofile=(req,res,next)=>{
    try{

    }catch(err){
        next(err);
    }
};
export const updateprofile=(req,res,next)=>{
    try{

    }catch(err){
        next(err);
    }
};
export const updatepassword=(req,res,next)=>{
    try{

    }catch(err){
        next(err);
    }
};