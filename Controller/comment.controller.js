import { validationResult } from "express-validator";
import express, { request, response } from "express";
import nodemailer from "nodemailer";
import { Comment } from "../model/comment.model.js";


export const createComment = async (req, res, next) => {
  try {
    const { user, targetId, type, text } = req.body;

    if (!user || !targetId || !type || !text) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await Comment.create({ user, targetId, type, text });

    return res.status(201).json({
      message: "Comment added successfully",
      comment: result
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const { targetId, type } = req.query;
    if (!targetId || !type)
      return res.status(400).json({ error: "targetId and type required" });
const comments = await Comment.find({ targetId, type })
  .populate("user", "name") // ab user ka name aa jayega
  .sort({ createdAt: -1 });

    // Populate user field to get name
    // const comments = await Comment.find({ targetId, type })
    //   .populate({ path: "user", select: "name" })  // <- populate user name
    //   .sort({ createdAt: -1 });  // Optional: latest comments first

    return res.status(200).json({ comments });  // <- frontend me res.data.comments use karo
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};



// export const getAllComments = async (req, res) => {
//   try {
//     const { targetId, type } = req.query;
//     if (!targetId || !type)
//       return res.status(400).json({ error: "targetId and type required" });

//     const comments = await Comment.find({ targetId, type }).populate("user", "name");
//     return res.status(200).json({ comments });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

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