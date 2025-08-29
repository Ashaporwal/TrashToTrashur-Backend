// controllers/product.controller.js
import mongoose from 'mongoose';
import { Product } from '../model/product.model.js';

export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock } = req.body;

    // Handle uploaded images (Multer)
    const images = req.files ? req.files.map(file => file.filename) : [];

    // Handle createdBy field
    let createdBy = req.body.createdBy || null;
    if (createdBy) {
      // Remove extra quotes if present
      createdBy = createdBy.replace(/^"+|"+$/g, '');
      // Validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(createdBy)) {
        createdBy = null;
      }
    }

    const product = await Product.create({
      title,
      description,
      price,
      category,
      stock,
      images,
      createdBy,
      isAvailable: true
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ error: "Error fetching products", details: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ error: "Error fetching product", details: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock } = req.body;

    let updateData = { title, description, price, category, stock };

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => file.filename);
    }

    // Handle createdBy if updating
    if (req.body.createdBy) {
      let createdBy = req.body.createdBy.replace(/^"+|"+$/g, '');
      if (mongoose.Types.ObjectId.isValid(createdBy)) {
        updateData.createdBy = createdBy;
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ error: "Error updating product", details: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting product", details: err.message });
  }
};


// // controllers/productController.js
// import {Product} from '../model/product.model.js';


// export const createProduct = async (req, res) => {
//   try {
//     const { title, description, price, category, stock } = req.body;

//     // Multer uploaded files
//     // const images = req.files ? req.files.map(file => file.filename) : [];
//     // const images = req.files ? req.files.map(file => file.filename) : [];

//     const images = req.files ? req.files.map(file => file.filename) : [];


//     const product = await Product.create({
//       title,
//       description,
//       price,
//       category,
//       stock,
//       images,
//       createdBy: req.body.createdBy || null,
//       isAvailable: true
//     });

//     res.status(201).json(product);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };


// export const getAllProduct = async (req, res) => {
//   try {
//     const products = await Product.find();
//     // Remove the filter below to show all products
//     // const productsWithImages = products.filter(p => p.images && p.images.length > 0);
//     res.status(200).json(products); // Respond with all products
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching products", error });
//   }
// }

// export const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching product", error });
//   }
// };

// export const updateProduct = async (req, res) => {
//   try {
//     const { title, description, price, category } = req.body;

//     let updateData = { title, description, price, category };

   
//     if (req.files && req.files.length > 0) {
//       updateData.images = req.files.map((file) => file.filename);
//     }

//     const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//     });

//     if (!product) return res.status(404).json({ message: "Product not found" });

//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating product", error });
//   }
// };

// export const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting product", error });
//   }
// };


























// import { validationResult } from "express-validator";
// import express, { request, response } from "express";
// import nodemailer from "nodemailer";
// import { Product } from "../model/product.model.js";
// import { User } from "../model/user.model.js";


// export const createProduct = async (req, res, next) => {
//   try {
//     // Validate input
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ success: false, errors: errors.array() });
//     }

//     // Handle uploaded images (assuming you are using multer)
//     let imagePaths = [];
//     if (req.files && req.files.length > 0) {
//       imagePaths = req.files.map(file => file.path.replace("public/", "")); // store paths
//     }
//     console.log(req.files);
//     // Manually create product object
//     const productData = {
//       title: req.body.title,
//       description: req.body.description,
//       price: req.body.price,
//       category: req.body.category,
//       stock: req.body.stock,
//       createdBy: req.body.createdBy,
//       images: imagePaths,
//       isAvailable: req.body.isAvailable || true
//     };

//     // Save to DB
//     const product = await Product.create(productData);

//     return res.status(201).json({ message: "Product created successfully", product });

//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };


// // export const createProduct = async(request,response,next)=>{
// //     try{
// //          console.log(request.body);
// //         const errors = validationResult(request);
// //         if(!errors.isEmpty()){
// //             return response.status(201).json({success:false,errors:errors.array()});
// //         }
// //      const result = await Product.create(request.body)
// //      return response.status(201).json({message:"Product craeted successfully"});
// //     }catch(err){
// //         console.log(err);
// //         return response.status(500).json({error:"Internal server Error"});
// //     }
// // }


// export const getAllProduct = async(request,response,next)=>{
//     try{
//       const product = await Product.find().populate("createdBy","name email ");
//       return response.status(200).json({success:true,message:"All products Found Successfully",data:product});
//     }catch(err){
//         console.log(err);
//             console.log("Error in getAllProduct:", err);
//         return response.status(500).json({error:"Internal server error"});
//     }
// }

// export const updateProduct = async(request,response,next)=>{
//     try{
//        let {id} = request.params;
//        let updateData = request.body;
//        if(!id){
//        return  response.status(401).json({message:"Product is is required "})
//        }
//        let result = await Product.updateOne({_id:id},{$set:updateData});
//        if(result.modifiedCount===0){
//          return  response.status(400).json({message:"No Product found "})
//        }
//         return  response.status(200).json({message:"Product updated Successfully"})
//     }catch(err){
//         console.log(err);
//         return response.status(500).json({error:"Internal server error"});
//     }
// };

// export const deleted = async(request,response,next)=>{
//     // deletedProduct
//     try{
//        let {id} = request.params;
//  if(!id){
//     return response.status(400).json({message:"Product id is required"});
//  }
//  let result = await Product.deleteOne({_id:id});
//  if(result.deletedCount===0){
//         return response.status(404).json({message:"No Product found"});
//  }
//  return response.status(200).json({message:"Product deleted Successfully"});
//     }catch(err){
//         console.log(err);
//         return response.status(500).json({error:"Internal server error"});

//     }
// }