import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import userModel from "../models/user.js";

export const signin = async(req,res)=>{
    const {email, password} = req.body;
    try {
        const existingUser = await userModel.findOne({email});
        if(!existingUser) return res.status(404).json({message:"User doesn't exist, please Sign Up"});
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect) return res.status(404).json({message:"Invalid Credentials"});
        const token = jwt.sign({email:existingUser.email, id:existingUser._id}, 'test',{expiresIn:"1h"});
        res.status(200).json({result:existingUser, token});
    } catch (error) {
        res.status(500).json({message:"something went wrong"});
    }
}

export const signup = async(req,res)=>{
    const {firstName, lastName, email, password, confirmPassword} = req.body;
   
    try {
        const existingUser =  await userModel.findOne({email});
    } catch (error) {
        
    }
}