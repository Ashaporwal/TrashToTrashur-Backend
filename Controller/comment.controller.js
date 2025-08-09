import { validationResult } from "express-validator";
import express, { request, response } from "express";
import nodemailer from "nodemailer";
import { Comment } from "../model/comment.model.js";


export const createComment = async(request,response,next)=>{
    try{
   const {user,targetId,type,text} = request.body;
if(!user || !targetId || !type || !text){
    return response.status(400).json({error:"All fields are required"});
}


   const result = await Comment.create(user,targetId,type,text);
     return response.status(201).json({message:"Comment added successfully"});
   
    }catch(err){
        console.log(err);
        return response.status(500).json({err:"Internal server error"});
    }
}



export const getAllComments = async(request,response,next)=>{
try{
   let {targetId} = request.params;
   let {type} = request.query;

   if(!targetId && !type){
    return response.status(400).json({error:"All fields are required"});
   }
   const result = await Comment.find({targetId,type});
   return response.status(200).json({message:"All Comments Found successfully",data:result});
}catch(err)
{
    console.log(err);
    return response.status(500).json({err:"Internal server error"});
}
}

export const deleteComments= async(request,response,next)=>{
      try{
    let {id} = request.params;
  
   if(!id){
    return response.status(404).json({error:"Id not found"});
   }
   let result = await Comment.destroy();
   if(!result===0)
   return response.status(200).json({message:"Deleted comment successfully"});
}catch(err){
   console.log(err);
   return response.status(500).json({error:"Internal server error"});
}
}

export const upadteComment = async(request,response,next)=>{
    try{
        let {id} = request.params;
      
        if(!id) {
            return response.status(404).json({error:"Id is required"});
        }
        let result = await Comment.updateOne(id);

        if(!result){
            return response.status(500).json({message:" id not found "});
        }
        return response.status(200).json({message:"Successfully updated"});
    }catch(err){
        console.log(err);

        return response.status(500).josn({error:"Internal server error"});
    }
}