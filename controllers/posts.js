import {postMessage} from "../models/postMessage.js";
import { Kafka } from "kafkajs";
import mongoose from "mongoose";
import produce_message from "../kafka_tool/producer/kafka_producer.js"
// Creating a Kafka instance
// const kafka = new Kafka({
//   clientId: 'memories__prod',
//   brokers: ['localhost:9092'], // Replace with your Kafka broker addresses
// });


export const getPosts = async (req,res)=>{
    try {
        console.log("going to try");
       const postMessages = await postMessage.find({});
       console.log("try successful");
       console.log(postMessages[2])
    produce_message(JSON.stringify(postMessages[2]));
       res.status(200).json(postMessages);
    } catch (error) {
        // console.log("caught an error");
        res.status(404).json({message:error.message});
    }
}
// export getPosts;

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    // console.log(req);
    try {
      const titleRegex = new RegExp(searchQuery, 'i');
      const posts = await postMessage.find({
        $or: [
          { title: { $regex: `(?i)${searchQuery}(?-i)`}},
          { tags: { $in: tags.split(',') }}
        ]
      });
      console.log(posts,tags,searchQuery);
      res.json({ data: posts });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  };

// export const getPostsBySearch = async (req, res)=>{
//     const {searchTerm, tags} = req.query;
//     try {
//         const title = new RegExp(searchTerm, 'i');
//         const posts = await postMessage.find({
//             $or:[{title:{$regex: title} },{tags:{$in:tags.split(',')}}]
//         });
//         res.json({data:posts});
//     } catch (error) {
//         console.log(error);
//     }
// }

export const createPost = async (req,res)=>{
    // console.log(req.body);
    const post = req.body;
    const newPost = postMessage({...post,creator:req.userId, createdAt: new Date().toISOString()});
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
    // console.log("Updating a post", req.userId);
    if(!req.userId)return res.status(400).json({message:"Unauthenticated"});

    // console.log(req.params);
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post ID");

    const post = await postMessage.findById(_id);

    const index = post.likes.findIndex((id)=>id===String(req.userId));

    if(index === -1){
        //like the post
        post.likes.push(req.userId);
    }else{
        //dislike
        // console.log("disliking")
        post.likes = post.likes.filter((id)=>id!==String(req.userId));
    }

    const updatedPost = await postMessage.findByIdAndUpdate(_id, {likes: post.likes}, {new:true});
    // console.log("return of like is ", updatedPost);
    res.status(201).json(updatedPost);
 }
// export  createPost;