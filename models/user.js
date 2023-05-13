import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    createdOn:{
        type:Date,
        default: new Date()
    }
})

export default mongoose.model("User",userSchema);