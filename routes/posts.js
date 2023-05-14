import  Express from "express";
import {getPosts, createPost, updatePost, deletePost, likePost} from "../controllers/posts.js"

import authMid from "../middleware/auth.js";

const router = Express.Router();

router.get("/",getPosts);
router.post("/",authMid,createPost);
router.patch("/:id",authMid, updatePost);
router.delete("/:id",authMid, deletePost);
router.patch("/:id/likePost",authMid, likePost);

export default router;