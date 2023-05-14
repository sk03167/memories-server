import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator:String,
    tags:[String],
    selectedFile: String,
    likes:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default: new Date()
    }
})

export const postMessage = mongoose.model('Message',postSchema);
// export default postMessage;
