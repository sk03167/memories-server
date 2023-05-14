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
        const token = jwt.sign({email:existingUser.email, id:existingUser._id}, process.env.ENCRYPTION_KEY,{expiresIn:"1h"});
        // console.log(token)
        res.status(200).json({result:existingUser, token});
    } catch (error) {
        res.status(500).json({message:"something went wrong"});
    }
}

export const signup = async(req,res)=>{
    const {firstName, lastName, email, password, confirmPassword} = req.body;
//    console.log(req.body);
    try {
        const existingUser =  await userModel.findOne({email});
        // console.log("existing user ",existingUser)
        if(existingUser) return res.status(400).json({message:"User already exists"});
        if(password!==confirmPassword) return res.status(400).json({message:"Password does not match"});
        const hashedPassword = await bcrypt.hash(password, 12);
        // console.log(hashedPassword);
        const newUser =  userModel({name:`${firstName} ${lastName}`,email,password:hashedPassword});
        const result = await newUser.save();
        console.log(result);
        const token = jwt.sign({email:result.email, id:result._id}, process.env.ENCRYPTION_KEY, {expiresIn:"1h"});      
        res.status(200).json({result, token});
    } catch (error) {
        res.status(500).json({message:"something went wrong"});
    }
}