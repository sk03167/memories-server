import  Express from "express";
import {signin, signup} from "../controllers/user.js"
const router = Express.Router();

router.get("/", (req,res)=>res.send("could be the user api"))
router.post("/signin", signin);
router.post("/signup", signup);

export default router;