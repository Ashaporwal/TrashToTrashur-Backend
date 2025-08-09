import express, { request } from "express";

import mongoose from "mongoose";

import { Order } from "../model/order.model.js";
import { Product } from "../model/product.model.js";


// export const createOrder = async(request,response,next)=>{
//     try{
//        let {user,products,shippingInfo,paymentMode,totalAMount,orderNote} = request.body;
//        if(!user||!products || !products.length ===0){
//          return response.status(400).json({ error: "User and products are required" });
//        }
       
//        let foundproduct = await Product.findById(product);
//        if(!foundproduct){
//         return response.status(404).json({error: "Product not found.."});
//        }
//        let result = await Order.create({product,buyer:user,quantity,totalPrice});
//        return response.status(201).json({message:"Order creted Successfully",order:result});
       
//     }catch(err){
//         console.log(err);
//         response.status(500).json({error:"Internal server error"});
//     }
// }

export const createOrder = async (req, res, next) => {
  try {
    const { user, products, shippingInfo, paymentMode, totalAmount, orderNote } = req.body;

    if (!user || !products || products.length === 0) {
      return res.status(400).json({ error: "User and products are required" });
    }

    // Validate all products exist
    for (const item of products) {
      const found = await Product.findById(item.product);
      if (!found) {
        return res.status(404).json({ error: `Product not found: ${item.product}` });
      }
    }

    const order = await Order.create({
      buyer: user,
      products,
      shippingInfo,
      paymentMode,
      totalAmount,
      orderNote
    });

    return res.status(201).json({ message: "Order created successfully", order });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const getAllOrders = async(request,response,next)=>{
    try{
        let {user,status} = request.query;
        let result = await Order.find({user},{status}).populate("product buyer");
  response.status(200).json({message:"All order found successfully"});
    }catch(err){
        console.log(err);
       return response.status(500).json({error:"Internal server error"});
    }
}



export const getOrderByUser = async(request,response,next)=>{
    try{
     let {userId} = request.body;
if(!userId){
    return response.status(400).json({error:"User Id is required"});
}    

      let result = await Order.find({buyer:"userId"}).populate("product");
      if(result.length===0){
        return response.status(404).json({message:"Orders not found for this user"});

      }
      return response.status(200).json({message:"Orders found SUccessfully"});

    }catch(err){
        console.log(err);
        response.status(500).json({error:"Internal server error"});
    }
};



export const updateOrderStatus = async(request,response,next)=>{
    try{
      let {orderId,status} = request.body;

      if(!orderId && !status){
        return response.status(400).json({message:"Order is required | status si required"});
      }

      let result = await Order.findById(orderId);
      if(!result){
         return response.status(404).json({message:"OrderId  is required"});
      }
      result.status = status;
      await result.save();
      return  response.status(200).json({message:"update order SUccessfully"});
    }catch(err){
        console.log(err);
        response.status(500).json({error:"Internal server error"});
    }
}


export const deletedOrder = async(request,response,next)=>{
    try{
       let {orderId} = request.params;
 if(!orderId){
    return response.status(400).json({message:"Order id is required"});
 }
 let result = await Order.deleteOne({_id:orderId});
 if(result.deletedCount===0){
        return response.status(404).json({message:"No Order found"});
 }
 return response.status(200).json({message:"Order deleted Successfully"});
    }catch(err){
        console.log(err);
        return response.status(500).json({error:"Internal server error"});

    }
}