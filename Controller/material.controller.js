

import { validationResult } from "express-validator";
import express from "express";
import nodemailer from "nodemailer";
import { Material } from "../model/material.model.js";
import { Order } from "../model/order.model.js"; // Add this if using getMaterialsWithSales

// CREATE MATERIAL
export const createMaterial = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);

    const { title, description, price, quantity, category, tags, submittedBy } = req.body;

    // if (!title || !description || !category || !submittedBy || !price || !quantity) 
    
    if (
  !title || 
  !description || 
  !category || 
  !submittedBy || 
  price == null || 
  price === "" || 
  quantity == null || 
  quantity === ""
)
    {
      return res.status(400).json({
        error: "Title, description, category, submittedBy, price, and quantity are required",
      });
    }

const newMaterial = new Material({
  title,
  description,
  category,
  images: req.file ? [`/uploads/${req.file.filename}`] : [],
  tags: tags ? tags.split(",").map(t => t.trim()) : [],
  status: "pending",
  submittedBy,
  price: Number(price),   // <-- Add this
  quantity: Number(quantity),
  totalSold: 0,
});


    await newMaterial.save();
    res.status(201).json({ message: "Material added successfully", material: newMaterial });
    console.log(newMaterial);
  } catch (err) {
    console.error("Error in createMaterial:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// GET ALL MATERIALS
export const getAllMaterials = async (req, res) => {
  try {
    const allmaterial = await Material.find().populate("submittedBy", "name");
    res.json({ allmaterial });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET MATERIAL BY ID
export const getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }
    return res.status(200).json({ message: "Material fetched successfully", material });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// GET MATERIALS BY BUYER
export const getMaterialsByBuyer = async (req, res) => {
  try {
    const buyerId = req.params.buyerId;
    console.log("BuyerId received:", buyerId);
    const materials = await Material.find({ submittedBy: buyerId });
    res.status(200).json({ allmaterial: materials });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};



// GET MATERIALS WITH SALES (optional)
export const getMaterialsWithSales = async (req, res) => {
  try {
    const buyerId = req.params.buyerId;
    if (!buyerId) return res.status(400).json({ error: "Buyer ID required" });

    const materials = await Material.find({ submittedBy: buyerId });

    const result = await Promise.all(
      materials.map(async (mat) => {
        const soldOrders = await Order.find({ material: mat._id });
        const totalSold = soldOrders.reduce((sum, o) => sum + o.quantity, 0);
        return {
          ...mat.toObject(),
          totalSold,
          remainingStock: mat.quantity - totalSold,
        };
      })
    );

    res.status(200).json({ materials: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE MATERIAL
export const deleteMaterial = async (req, res) => {
  try {
    const deleted = await Material.findByIdAndDelete(req.params.id); // Fixed: used Material instead of Tutorial
    if (!deleted) {
      return res.status(404).json({ message: "Material not found to delete" });
    }
    res.status(200).json({ message: "Material successfully deleted", deleted });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// import { validationResult } from "express-validator";
// import express, { request, response } from "express";
// import nodemailer from "nodemailer";
// import { Material } from "../model/material.model.js";


// // export const createMaterial = async (req, res) => {
// //     try {
// //         console.log("REQ BODY:", req.body);
// //         console.log("REQ FILE:", req.file);

// //         const { title, description, category, tags, status, submittedBy } = req.body;

// //         if (!title || !description || !category || !status || !submittedBy) {
// //             return res.status(400).json({ error: "All fields are required" });
// //         }
// // if (!submittedBy) {
// //     return res.status(400).json({ error: "submittedBy is required" });
// // }

// //         const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

// //         const material = await Material.create({
// //             title,
// //             description,
// //             category,
// //             images: imagePath ? [imagePath] : [],
// //             tags: tags ? tags.split(",").map(t => t.trim()) : [],
// //             status,
// //             submittedBy
// //         });
        
// // return res.status(201).json({message:"Material Submitted Successfully..",material});
// //       } catch (err) {
// //     console.error("Error in createMaterial:", err); 
// //     res.status(500).json({ error: err.message }); 
// // }
// // };

// // export const getallMaterial = async (req, res) => {
// //     try {
// //         const allmaterial = await Material.find();
// //         return res.status(200).json({ message: "All material fetched successfully", allmaterial });
// //     } catch (err) {
// //         return res.status(500).json({ error: "Internal server error" });
// //     }
// // };



// // export const createMaterial = async(req,res)=>{
// //     try{
// //         const {title,description,category,images,tags,status,submittedBy} = req.body;
// //         if(!title || !description|| !category||!images||!tags||!status||! submittedBy){
// //             return res.status(400).json({error:"all are required"});
// //         }
        
// //             const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

// //     const material = await Material.create({
// //         title,description,category,images:imagePath, tags: tags ? tags.split(",").map(t => t.trim()) : [],status,submittedBy
// //     });
// // return res.status(201).json({message:"Material Submitted Successfully"})
// //     }catch(err){
// //         return response.status(404).json({error:"Interval server error"});
// //     }
// // };



// // export const createMaterial = async (req, res) => {
// //   try {
// //     const newMaterial = new Material({...req.body,images: req.file ? [`/uploads/${req.file.filename}`] : []
// //     });
// //     await newMaterial.save();
// //     res.status(201).json({ message: "Material added", material: newMaterial });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// export const createMaterial = async (req, res) => {
//   try {
//     const { title, description, category, tags, submittedBy } = req.body;
// console.log("sum = ",submittedBy);

//     if (!title || !description || !category || !submittedBy) {
//       return res.status(400).json({ error: "Title, description, category & submittedBy are required" });
//     }

//     const newMaterial = new Material({
//       title,
//       description,
//       category,
//       images: req.file ? [`/uploads/${req.file.filename}`] : [],
//       tags: tags ? tags.split(",").map(t => t.trim()) : [],
//       status: "pending",
//       submittedBy
//     });

//     await newMaterial.save();
//     res.status(201).json({ message: "Material added", material: newMaterial });
//   } catch (err) {
//     console.error("Error in createMaterial:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };



// export const getAllMaterials = async (req, res) => {
//   try {
//     const allmaterial = await Material.find()
//       .populate("submittedBy", "name");
//     res.json({ allmaterial });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// export const getMaterialById = async (req, res) => {
//     try {
//         const material = await Material.findById(req.params.id);
//         if (!material) {
//             return res.status(404).json({ message: "Material not found" });
//         }
//         return res.status(200).json({ message: "Material fetched successfully", material });
//     } catch (err) {
//         return res.status(400).json({ error: err.message });
//     }
// };
// export const getMaterialsByBuyer = async (req, res,next) => {
//   const buyerId = req.params.buyerId;
//   const materials = await Material.find({ submittedBy: buyerId });
//   res.status(200).json({ allmaterial: materials });
// };


// export const getMaterialsWithSales = async (req, res) => {
//   try {
//     const buyerId = req.params.buyerId;
//     if (!buyerId) return res.status(400).json({ error: "Buyer ID required" });

//     const materials = await Material.find({ submittedBy: buyerId });

//     const result = await Promise.all(
//       materials.map(async (mat) => {
//         const soldOrders = await Order.find({ material: mat._id });
//         const totalSold = soldOrders.reduce((sum, o) => sum + o.quantity, 0);
//         return {
//           ...mat.toObject(),
//           totalSold,
//           remainingStock: mat.quantity - totalSold,
//         };
//       })
//     );

//     res.status(200).json({ materials: result });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };



// export const deleteMaterial = async (req,res) =>{
//   try{
//     const deleted = await Tutorial.findByIdAndDelete(req.params.id);
//     if(!deleted){
//       return res.status(404).json({message:"Material not found to delete"});

//     }
//     res.status(200).json({message:"Materiall successfully deleted",deleted});
//   }catch(err){
//     res.status(400).json({message:"err: err.message"});
//   }
// }

