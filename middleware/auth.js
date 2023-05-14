import jwt from "jsonwebtoken"

const authMid = async (req,res,next)=>{
    try {
        console.log(req.headers);
        const token = req.headers.authorization?.split(" ")[1];
        const isCustomAuth = token?.length<500;
        let decodedData;
        // console.log("authmid token",token);
        if(token&&isCustomAuth){
            decodedData = jwt.verify(token,process.env.ENCRYPTION_KEY);
            // console.log(decodedData);
            req.userId = decodedData?.id;
        }else{
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

export default authMid;