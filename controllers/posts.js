import {postMessage} from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req,res)=>{
    try {
        // console.log("going to try");
       const postMessages = await postMessage.find();
    //    console.log("try successful");
    //    console.log(postMessages);
       res.status(200).json(postMessages);
    } catch (error) {
        // console.log("caught an error");
        res.status(404).json({message:error.message});
    }
}
// export getPosts;

export const createPost = async (req,res)=>{
    // console.log(req.body);
    const post = req.body;
    const newPost = postMessage(post);
    try {
        await newPost.save()
        res.status(201).json(newPost);
    } catch (error) {
        res.json({message:error.message});
    }
}

export const updatePost = async (req,res)=>{
   const {id:_id} = req.params;
    const post = req.body;
    // console.log("Updating a post");
   if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post ID");
    
   const updatedPost = await postMessage.findByIdAndUpdate(_id, post, {new:true});
   res.status(201).json(updatedPost);
}

export const deletePost = async (req,res)=>{
    const {id:_id} = req.params;
    //  console.log("Deleting a post");
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post ID");
     try {
        const updatedPost = await postMessage.findByIdAndRemove(_id);
     } catch (error) {
        console.log("error in deleting", error);
     }
   
    res.status(201).json({message:"Post was deleted"});
 }

 export const likePost = async (req,res)=>{
    const {id:_id} = req.params;
    // console.log(req.params);
     // console.log("Updating a post");
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post ID");
     
    const post = await postMessage.findById(_id);
    const updatedPost = await postMessage.findByIdAndUpdate(_id, {likeCount: post.likeCount+1}, {new:true});
    // console.log("return of like is ", updatedPost);
    res.status(201).json(updatedPost);
 }
// export  createPost;