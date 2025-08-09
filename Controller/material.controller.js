import { validationResult } from "express-validator";
import express, { request, response } from "express";
import nodemailer from "nodemailer";
import { Material } from "../model/material.model.js";


// export const createMaterial = async (req, res) => {
//     try {
//         console.log("REQ BODY:", req.body);
//         console.log("REQ FILE:", req.file);

//         const { title, description, category, tags, status, submittedBy } = req.body;

//         if (!title || !description || !category || !status || !submittedBy) {
//             return res.status(400).json({ error: "All fields are required" });
//         }
// if (!submittedBy) {
//     return res.status(400).json({ error: "submittedBy is required" });
// }

//         const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

//         const material = await Material.create({
//             title,
//             description,
//             category,
//             images: imagePath ? [imagePath] : [],
//             tags: tags ? tags.split(",").map(t => t.trim()) : [],
//             status,
//             submittedBy
//         });
        
// return res.status(201).json({message:"Material Submitted Successfully..",material});
//       } catch (err) {
//     console.error("Error in createMaterial:", err); 
//     res.status(500).json({ error: err.message }); 
// }
// };

// export const getallMaterial = async (req, res) => {
//     try {
//         const allmaterial = await Material.find();
//         return res.status(200).json({ message: "All material fetched successfully", allmaterial });
//     } catch (err) {
//         return res.status(500).json({ error: "Internal server error" });
//     }
// };



// export const createMaterial = async(req,res)=>{
//     try{
//         const {title,description,category,images,tags,status,submittedBy} = req.body;
//         if(!title || !description|| !category||!images||!tags||!status||! submittedBy){
//             return res.status(400).json({error:"all are required"});
//         }
        
//             const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

//     const material = await Material.create({
//         title,description,category,images:imagePath, tags: tags ? tags.split(",").map(t => t.trim()) : [],status,submittedBy
//     });
// return res.status(201).json({message:"Material Submitted Successfully"})
//     }catch(err){
//         return response.status(404).json({error:"Interval server error"});
//     }
// };




export const createMaterial = async (req, res) => {
    try {
        console.log("REQ BODY:", req.body);
        console.log("REQ FILE:", req.file);

        const { title, description, category, tags, status, submittedBy } = req.body;

        if (!title || !description || !category || !status || !submittedBy) {
            return res.status(400).json({ error: "All fields are required" });
        }

        let imagePathArray = [];
        if (req.file) {
            imagePathArray.push(`/uploads/${req.file.filename}`);
        }

        const material = await Material.create({
            title,
            description,
            category,
            images: imagePathArray,
            tags: tags ? tags.split(",").map(t => t.trim()) : [],
            status,
            submittedBy
        });

        return res.status(201).json({ message: "Material Submitted Successfully", material });
    } catch (err) {
        console.error("Error in createMaterial:", err);
        return res.status(500).json({ error: err.message });
    }
};

export const getallMaterial = async (req, res) => {
    try {
        const allmaterial = await Material.find();
        return res.status(200).json({ message: "All material fetched successfully", allmaterial });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

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


export const deleteMaterial = async (req,res) =>{
  try{
    const deleted = await Tutorial.findByIdAndDelete(req.params.id);
    if(!deleted){
      return res.status(404).json({message:"Material not found to delete"});

    }
    res.status(200).json({message:"Materiall successfully deleted",deleted});
  }catch(err){
    res.status(400).json({message:"err: err.message"});
  }
}

