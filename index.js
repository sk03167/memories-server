import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));

app.use(cors());

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

app.use('/posts',postRoutes);
app.use('/user',userRoutes);


//Had to cahnge my DNS server because my default dns server would not resolve this url, hence not allowing to conncet to db.

// const CONNECTION_URL = "mongodb+srv://memories:memories123@cluster0.onbja.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const CONNECTION_URL = "mongodb+srv://admin-shivansh:xmtjk2w288@cluster0.onbja.mongodb.net/todolistDB?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
// try{
// mongoose.connect(CONNECTION_URL, { useNewUrlParser:true, useUnifiedTopology:true})
// console.log("connected to mongoose")
// }
// .then(()=>app.listen(
//     PORT,()=>console.log("Listening on "+PORT)
//     ))
// catch(error){console.log(error)};
// console.log("url env is ",process.env.CONNECTION_URL);

app.get("/",(req,res)=>{
  res.send("Welcome to memories api")
});

  mongoose.connect(process.env.CONNECTION_URL,  {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    .then(console.log("connected to mongoose"))
    .then(app.listen(
        PORT,()=>console.log("Listening on port "+PORT)
        ))
    .catch(error=>console.log(error))
    
    // console.log("Conncection part end")
        
    // mongoose.connection.on('connected', () => {
    //     console.log('connected');
    //     console.log(mongoose.connection.readyState); //logs 1
    //   });

// mongoose.set('useFindAndModify',false);