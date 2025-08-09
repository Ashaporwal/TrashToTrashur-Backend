import { validationResult } from "express-validator";
import express, { request, response } from "express";
import nodemailer from "nodemailer";
import multer from "multer";
import { Tutorial } from "../model/tutorial.model.js";


// export const createTutorial = async (req, res) => {
//   try {
//     const tutorial = new Tutorial(req.body);
//     await tutorial.save();
//     res.status(201).json({ message: "Tutorial created", tutorial });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// }

// export const createTutorial = async (req, res) => {
//   try {


//  const { title, description, videoUrl, steps, material } = req.body;
//  let parsedSteps = [];
// let parsedMaterials = [];


//    parsedSteps = typeof steps === "string" ? JSON.parse(steps) : steps;
//   parsedMaterials = typeof material === "string" ? JSON.parse(material) : material;

//     // // Save to DB here (mock response below)
//     // console.log("Tutorial Created:", tutorial);
//     // res.status(201).json({ message: "Tutorial created successfully" });
//   } catch (err) {
//     console.error("Error in createTutorial:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


export const createTutorial = async (req, res) => {
  try {
    const { title, description } = req.body;

    const images = req.files?.images?.map(file => `/uploads/${file.filename}`) || [];
    const videoPath = req.files?.video?.[0] ? `/uploads/${req.files.video[0].filename}` : null;

    const tutorial = new Tutorial({
      title,
      description,
      videoUrl: videoPath, // ✅ spelling sahi
      images
    });

    await tutorial.save();
    res.status(201).json({ message: "Tutorial created successfully", tutorial });
  } catch (error) {
    console.error("Error inside createTutorial:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};








// export const createTutorial = async (req, res) => {
//   try {
//     const { title, description, videoUrl } = req.body;
//     const steps = JSON.parse(req.body.steps);
//     const material = JSON.parse(req.body.material);

//     const images = req.files.map(file => ({
//       filename: file.originalname,
//       mimetype: file.mimetype,
//       buffer: file.buffer
//     }));

//     const tutorial = new Tutorial({
//       title,
//       description,
//       videoUrl,
//       steps,
//       material,
//       images, // Make sure your model supports this
//     });

//     await tutorial.save();
//     res.status(201).json({ message: "Tutorial created", tutorial });
//     console.log("BODY:", req.body);
// console.log("FILES:", req.files);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


export const getallTutorial = async (req, res) => {
  try {
    const tutorials = await Tutorial.find().populate("createdBy","name email");
    res.status(200).json({ message: "All Tutorials find Successfully", tutorials });

  }
  catch (err) {
    res.status(400).json({ err: err.message });
  }
}

export const getTutorialById = async (req, res) => {
  try {
    const tutorialByid = await Tutorial.findById( req.params.id);
    if(!tutorialByid){
      return res.status(404).json({message:"Tutorial not found"});
    }
    res.status(200).json({ message: "Tutorial fetched successfully", tutorialByid });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

export const deleteTutorial = async (req,res) =>{
  try{
    const deleted = await Tutorial.findByIdAndDelete(req.params.id);
    if(!deleted){
      return res.status(404).json({message:"Tutorial not found to delete"});

    }
    res.status(200).json({message:"Tutorial successfully deleted",deleted});
  }catch(err){
    res.status(400).json({message:"err: err.message"});
  }
}

