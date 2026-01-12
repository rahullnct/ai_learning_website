import express from "express";
import {body} from "express-validator";
import { login,register,getprofile,updateprofile,updatepassword } from "../Controllers/AuthController.js";

const router=express.Router();
const registerValidation=[
    body("username").trim().isLength({min:3}).withMessage("username must be atleast 3 characters"),
    body("email").isEmail().normalizeEmail().withMessage("please provide a valid email"),
    body("password").isLength({min:6}).withMessage("password  must be atleast 6 characters"),
]
const loginValidation=[
    body("email").isEmail().normalizeEmail().withMessage("please provide a valid email"),
    body("password").notEmpty().isLength({ min:6}).withMessage("password must be atleast 6 characters ")
]
router.post("/login",loginValidation,login);
router.post("/regiester",registerValidation,register);
router.get("/profile",getprofile);
router.post("/update/profile",updateprofile);
router.post("/update/password",updatepassword);


export default router;