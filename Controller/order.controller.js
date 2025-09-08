import { Order } from "../model/order.model.js";
import { Material } from "../model/material.model.js";


// export const createOrder = async (req, res) => {
//   try {
//     const { buyer, materialId, quantity, totalPrice, address } = req.body;

//     if (!buyer || !materialId || !quantity || !totalPrice || !address) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const material = await Material.findById(materialId);
//     if (!material) return res.status(404).json({ error: "Material not found" });

//     if (quantity > material.quantity) {
//       return res
//         .status(400)
//         .json({ error: `Only ${material.quantity} items available in stock` });
//     }

//     // Reduce stock
//     material.quantity -= quantity;
//     await material.save();

//     const order = await Order.create({
//       material: materialId,
//       buyer,
//       seller: material.submittedBy,
//       quantity,
//       totalPrice,
//       address,
//       status: "pending",
//     });

//     return res.status(201).json({ message: "Order placed successfully", order });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };


// Get orders by crafter

export const createOrder = async (req, res) => {
  try {
    const { buyer, materialId, quantity, totalPrice, address } = req.body;

    if (!buyer || !materialId || !address || quantity == null || totalPrice == null) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (quantity <= 0 || totalPrice <= 0) {
      return res
        .status(400)
        .json({ error: "Quantity and total price must be greater than 0" });
    }

    const material = await Material.findById(materialId);
    if (!material) return res.status(404).json({ error: "Material not found" });

    if (quantity > material.quantity) {
      return res
        .status(400)
        .json({ error: `Only ${material.quantity} items available in stock` });
    }

    // Reduce stock
    material.quantity -= quantity;
    await material.save();

    const order = await Order.create({
      material: materialId,
      buyer,
      seller: material.submittedBy,
      quantity,
      totalPrice,
      address,
      status: "pending",
    });
    await order.populate("material");

    return res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getOrderByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // buyer field se find karna hai
    const orders = await Order.find({ buyer: userId })
      .populate("material")   // tumne createOrder me material store kiya hai
      .populate("seller");

    if (!orders || orders.length === 0) {
      return res.status(200).json({ message: "No orders found for this user", orders: [] });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user orders", error });
  }
};


// export const getOrderByUser = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const orders = await Order.find({ userId }).populate("materialId").populate("crafterId");
//     if (!orders || orders.length === 0) {
//       return res.status(200).json({ message: "No orders found for this user" });
//     }
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching user orders", error });
//   }
// };

export const getOrderByCrafter = async (req, res) => {
  try {
    const { crafterId } = req.params;
    if (!crafterId) return res.status(400).json({ error: "Crafter ID required" });

    const orders = await Order.find({ buyer: crafterId }).populate("material seller");
    return res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) return res.status(400).json({ message: "Order id required" });

    const result = await Order.deleteOne({ _id: orderId });
    if (result.deletedCount === 0) return res.status(404).json({ message: "Order not found" });

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) return res.status(400).json({ message: "OrderId & status required" });

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    return res.status(200).json({ message: "Order status updated successfully", order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};





// import express from "express";
// import mongoose from "mongoose";
// import { Order } from "../model/order.model.js";
// import { Material } from "../model/material.model.js";


// export const createOrder = async (req, res) => {
//   try {
//     const { buyer, materialId, quantity, address } = req.body;

//     if (!buyer || !materialId || !quantity || !address) {
//       return res.status(400).json({ error: "Buyer, materialId, quantity & address are required" });
//     }

//     const material = await Material.findById(materialId);
//     if (!material) return res.status(404).json({ error: "Material not found" });

//     if (material.quantity < quantity)
//       return res.status(400).json({ error: "Not enough stock" });

//     const totalPrice = material.price * quantity;

//     const order = await Order.create({
//       material: materialId,
//       buyer,
//       seller: material.submittedBy, // from material model
//       quantity,
//       totalPrice,
//       status: "pending",
//       address
//     });

//     material.quantity -= quantity;
//     await material.save();

//     return res.status(201).json({ message: "Order created successfully", order });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };


// export const getAllOrders = async (req, res) => {
//   try {
//     const { status } = req.query;
//     const filter = status ? { status } : {};
//     const orders = await Order.find(filter).populate("product buyer seller");

//     return res.status(200).json({ message: "All orders fetched successfully", orders });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };


// export const getOrderByCrafter = async (req, res) => {
//   try {
//     const { crafterId } = req.params;
//     if (!crafterId) return res.status(400).json({ error: "Crafter ID required" });

//     const orders = await Order.find({ buyer: crafterId }).populate("material seller");
//     if (orders.length === 0)
//       return res.status(200).json({ orders: [] });

//     return res.status(200).json({ orders });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };



// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId, status } = req.body;

//     if (!orderId || !status) {
//       return res.status(400).json({ message: "OrderId and status are required" });
//     }

//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     order.status = status;
//     await order.save();

//     return res.status(200).json({ message: "Order status updated successfully", order });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const deleteOrder = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     if (!orderId) {
//       return res.status(400).json({ message: "Order id is required" });
//     }

//     const result = await Order.deleteOne({ _id: orderId });
//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: "No Order found" });
//     }

//     return res.status(200).json({ message: "Order deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

















// import express, { request } from "express";

// import mongoose from "mongoose";

// import { Order } from "../model/order.model.js";
// import { Product } from "../model/product.model.js";


// // export const createOrder = async(request,response,next)=>{
// //     try{
// //        let {user,products,shippingInfo,paymentMode,totalAMount,orderNote} = request.body;
// //        if(!user||!products || !products.length ===0){
// //          return response.status(400).json({ error: "User and products are required" });
// //        }
       
// //        let foundproduct = await Product.findById(product);
// //        if(!foundproduct){
// //         return response.status(404).json({error: "Product not found.."});
// //        }
// //        let result = await Order.create({product,buyer:user,quantity,totalPrice});
// //        return response.status(201).json({message:"Order creted Successfully",order:result});
       
// //     }catch(err){
// //         console.log(err);
// //         response.status(500).json({error:"Internal server error"});
// //     }
// // }

// export const createOrder = async (req, res, next) => {
//   try {
//     const { user, products, shippingInfo, paymentMode, totalAmount, orderNote } = req.body;

//     if (!user || !products || products.length === 0) {
//       return res.status(400).json({ error: "User and products are required" });
//     }

//     // Validate all products exist
//     for (const item of products) {
//       const found = await Product.findById(item.product);
//       if (!found) {
//         return res.status(404).json({ error: `Product not found: ${item.product}` });
//       }
//     }

//     const order = await Order.create({
//       buyer: user,
//       products,
//       shippingInfo,
//       paymentMode,
//       totalAmount,
//       orderNote
//     });

//     return res.status(201).json({ message: "Order created successfully", order });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };


// export const getAllOrders = async(request,response,next)=>{
//     try{
//         let {user,status} = request.query;
//         let result = await Order.find({user},{status}).populate("product buyer");
//   response.status(200).json({message:"All order found successfully"});
//     }catch(err){
//         console.log(err);
//        return response.status(500).json({error:"Internal server error"});
//     }
// }



// export const getOrderByUser = async(request,response,next)=>{
//     try{
//      let {userId} = request.body;
// if(!userId){
//     return response.status(400).json({error:"User Id is required"});
// }    

//       let result = await Order.find({buyer:"userId"}).populate("product");
//       if(result.length===0){
//         return response.status(404).json({message:"Orders not found for this user"});

//       }
//       return response.status(200).json({message:"Orders found SUccessfully"});

//     }catch(err){
//         console.log(err);
//         response.status(500).json({error:"Internal server error"});
//     }
// };



// export const updateOrderStatus = async(request,response,next)=>{
//     try{
//       let {orderId,status} = request.body;

//       if(!orderId && !status){
//         return response.status(400).json({message:"Order is required | status si required"});
//       }

//       let result = await Order.findById(orderId);
//       if(!result){
//          return response.status(404).json({message:"OrderId  is required"});
//       }
//       result.status = status;
//       await result.save();
//       return  response.status(200).json({message:"update order SUccessfully"});
//     }catch(err){
//         console.log(err);
//         response.status(500).json({error:"Internal server error"});
//     }
// }


// export const deletedOrder = async(request,response,next)=>{
//     try{
//        let {orderId} = request.params;
//  if(!orderId){
//     return response.status(400).json({message:"Order id is required"});
//  }
//  let result = await Order.deleteOne({_id:orderId});
//  if(result.deletedCount===0){
//         return response.status(404).json({message:"No Order found"});
//  }
//  return response.status(200).json({message:"Order deleted Successfully"});
//     }catch(err){
//         console.log(err);
//         return response.status(500).json({error:"Internal server error"});

//     }
// }