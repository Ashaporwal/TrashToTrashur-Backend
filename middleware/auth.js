import { request } from "express";


export const auth = async(request,response,next)=>{
    try{
        let token = request.cookies.token;
        JsonWebTokenError.verify(token,process.env.SECRET);
        next();
    }
    catch(err){
        return response.status(401).josn({error:"Unauthorized user"});
    }
}