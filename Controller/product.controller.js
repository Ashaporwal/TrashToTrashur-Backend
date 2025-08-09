import { validationResult } from "express-validator";
import express, { request, response } from "express";
import nodemailer from "nodemailer";
import { Product } from "../model/product.model.js";
import {User} from "../model/user.model.js";


export const createProduct = async(request,response,next)=>{
    try{
     const result = await Product.create(request.body)
     return response.status(201).json({message:"Product craeted successfully"});
    }catch(err){
        console.log(err);
        return response.status(500).json({error:"Internal server Error"});
    }
}


export const getAllProduct = async(request,response,next)=>{
    try{
      const product = await Product.find().populate("createdBy","name email");
      return response.status(200).json({message:"All products Found Successfully",data:product});
    }catch(err){
        console.log(err);
        return response.status(500).json({error:"Internal server error"});
    }
}

export const updateProduct = async(request,response,next)=>{
    try{
       let {id} = request.params;
       let updateData = request.body;
       if(!id){
       return  response.status(401).json({message:"Product is is required "})
       }
       let result = await Product.updateOne({_id:id},{$set:updateData});
       if(result.modifiedCount===0){
         return  response.status(400).json({message:"No Product found "})
       }
        return  response.status(200).json({message:"Product updated Successfully"})
    }catch(err){
        console.log(err);
        return response.status(500).json({error:"Internal server error"});
    }
};

export const deleted = async(request,response,next)=>{
    try{
       let {id} = request.params;
 if(!id){
    return response.status(400).json({message:"Product id is required"});
 }
 let result = await Product.deleteOne({_id:id});
 if(result.deletedCount===0){
        return response.status(404).json({message:"No Product found"});
 }
 return response.status(200).json({message:"Product deleted Successfully"});
    }catch(err){
        console.log(err);
        return response.status(500).json({error:"Internal server error"});

    }
}