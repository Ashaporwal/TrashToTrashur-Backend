
import { Tutorial } from "../model/tutorial.model.js";

let tutorials = []; 


export const createTutorial = async (req, res) => {
  try {
    const images = req.files.images ? req.files.images.map(f => ({ filename: f.filename, originalname: f.originalname })) : [];
    const video = req.files.video ? { filename: req.files.video[0].filename, originalname: req.files.video[0].originalname } : null;

    // const tutorial = new Tutorial({
    //   title: req.body.title,
    //   description: req.body.description,
    //   images,
    //   video,
    //   uploadedBy: req.body.uploadedBy 
    // });

    const tutorial = new Tutorial({
  title: req.body.title,
  description: req.body.description,
  images,
  video,
  uploadedBy: req.body.uploadedBy  // ✅ yaha userId aa raha hona chahiye
});
    await tutorial.save();
    res.status(201).json({ message: "Tutorial created", tutorial });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// export const getAllTutorials = async (req, res) => {
//   try {
//     const tutorials = await Tutorial.find().populate("uploadedBy", "name");
//     res.status(200).json(tutorials);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch tutorials", error: err });
//   }
// };

export const getAllTutorials = async (req, res) => {
  try {
    const userId = req.query.userId; // 👈 frontend se bhejna
    const tutorials = await Tutorial.find().populate("uploadedBy", "name");

    const formatted = tutorials.map(t => ({
      ...t._doc,
      likesCount: t.likedBy.length,
      isLiked: userId ? t.likedBy.some(id => id.toString() === userId) : false
    }));

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tutorials", error: err });
  }
};




export const updateTutorial = async (req, res) => {
  try {
    const tutorialId = req.params.id;
    const tutorial = await Tutorial.findById(tutorialId);
    if (!tutorial) return res.status(404).json({ message: "Tutorial not found" });

    // Update fields
    tutorial.title = req.body.title || tutorial.title;
    tutorial.description = req.body.description || tutorial.description;

    if (req.files.video) {
      tutorial.video = { filename: req.files.video[0].filename, originalname: req.files.video[0].originalname };
    }

    if (req.files.images) {
      tutorial.images = req.files.images.map(f => ({ filename: f.filename, originalname: f.originalname }));
    }

    await tutorial.save();
    res.json({ message: "Tutorial updated", tutorial });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed", error: err });
  }
};





export const getTutorialById = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    res.json(tutorial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTutorial = async (req, res) => {
  try {
    await Tutorial.findByIdAndDelete(req.params.id);
    res.json({ message: "Tutorial deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getMyTutorials = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tutorials = await Tutorial.find({ uploadedBy: userId })
      .populate("uploadedBy", "name"); 

    res.status(200).json({ success: true, tutorials });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
// export const likeTutorial = async (req, res) => {
//   try {
//     const tutorial = await Tutorial.findById(req.params.id);
//     if (!tutorial) return res.status(404).json({ message: "Tutorial not found" });

//     const userId = req.body.userId;
//     if (!userId) return res.status(400).json({ message: "User ID required" });

//     const likedIndex = tutorial.likedBy.findIndex(id => id.toString() === userId);
//     if (likedIndex === -1) tutorial.likedBy.push(userId); // like
//     else tutorial.likedBy.splice(likedIndex, 1); // unlike

//     await tutorial.save();
//     res.json({ likesCount: tutorial.likedBy.length, likedBy: tutorial.likedBy });
//   } catch (err) {
//     console.error("Like error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


















// import { validationResult } from "express-validator";
// import express, { request, response } from "express";
// import nodemailer from "nodemailer";
// import multer from "multer";
// import { Tutorial } from "../model/tutorial.model.js";


// // export const createTutorial = async (req, res) => {
// //   try {
// //     const tutorial = new Tutorial(req.body);
// //     await tutorial.save();
// //     res.status(201).json({ message: "Tutorial created", tutorial });
// //   } catch (error) {
// //     res.status(400).json({ error: error.message });
// //   }
// // }

// // export const createTutorial = async (req, res) => {
// //   try {


// //  const { title, description, videoUrl, steps, material } = req.body;
// //  let parsedSteps = [];
// // let parsedMaterials = [];


// //    parsedSteps = typeof steps === "string" ? JSON.parse(steps) : steps;
// //   parsedMaterials = typeof material === "string" ? JSON.parse(material) : material;

// //     // // Save to DB here (mock response below)
// //     // console.log("Tutorial Created:", tutorial);
// //     // res.status(201).json({ message: "Tutorial created successfully" });
// //   } catch (err) {
// //     console.error("Error in createTutorial:", err);
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };


// // controllers/tutorial.controller.js
// // import { Tutorial } from "../models/Tutorial.js";
// export const createTutorial = async (req, res) => {
//   try {
//     console.log("req.body:", req.body);
//     console.log("req.files:", req.files);

//     // Video URL: local file OR external URL
//     let videoUrl = req.body.videoUrl || (req.files.video ? req.files.video[0].path : null);

//     // Images: uploaded files OR external URLs
//     let imagesArray = [];
//     if (req.body.imageUrls) {
//       imagesArray = req.body.imageUrls.split(",").map(url => ({ path: url }));
//     }
//     if (req.files.images) {
//       imagesArray.push(...req.files.images.map(img => ({
//         filename: img.filename,
//         mimetype: img.mimetype,
//         path: img.path
//       })));
//     }

//     const tutorial = new Tutorial({
//       title: req.body.title,
//       description: req.body.description,
//       category: req.body.category,
//       tags: req.body.tags ? req.body.tags.split(",") : [],
//       videoUrl,
//       images: imagesArray,
//       createdBy: req.body.submittedBy
//     });

//     await tutorial.save();
//     res.status(201).json(tutorial);
//   } catch (err) {
//     console.error("Error saving tutorial:", err);
//     res.status(500).json({ error: "Failed to create tutorial" });
//   }
// };








// // export const createTutorial = async (req, res) => {
// //   try {
// //     const { title, description, videoUrl } = req.body;
// //     const steps = JSON.parse(req.body.steps);
// //     const material = JSON.parse(req.body.material);

// //     const images = req.files.map(file => ({
// //       filename: file.originalname,
// //       mimetype: file.mimetype,
// //       buffer: file.buffer
// //     }));

// //     const tutorial = new Tutorial({
// //       title,
// //       description,
// //       videoUrl,
// //       steps,
// //       material,
// //       images, // Make sure your model supports this
// //     });

// //     await tutorial.save();
// //     res.status(201).json({ message: "Tutorial created", tutorial });
// //     console.log("BODY:", req.body);
// // console.log("FILES:", req.files);
// //   } catch (error) {
// //     res.status(400).json({ error: error.message });
// //   }
// // };


// export const getallTutorial = async (req, res) => {
//   try {
//     const tutorials = await Tutorial.find().populate("createdBy","name email");
//     res.status(200).json({ message: "All Tutorials find Successfully", tutorials });

//   }
//   catch (err) {
//     res.status(400).json({ err: err.message });
//   }
// }

// export const getTutorialById = async (req, res) => {
//   try {
//     const tutorialByid = await Tutorial.findById( req.params.id);
//     if(!tutorialByid){
//       return res.status(404).json({message:"Tutorial not found"});
//     }
//     res.status(200).json({ message: "Tutorial fetched successfully", tutorialByid });
//   } catch (err) {
//     res.status(400).json({ err: err.message });
//   }
// }

// export const deleteTutorial = async (req,res) =>{
//   try{
//     const deleted = await Tutorial.findByIdAndDelete(req.params.id);
//     if(!deleted){
//       return res.status(404).json({message:"Tutorial not found to delete"});

//     }
//     res.status(200).json({message:"Tutorial successfully deleted",deleted});
//   }catch(err){
//     res.status(400).json({message:"err: err.message"});
//   }
// }

export const likeTutorial = async (req, res) => {
  try {
    const tutorialId = req.params.id;
    const userId = req.body.userId;

    if (!tutorialId || !userId) {
      return res.status(400).json({ message: "Tutorial ID and User ID required" });
    }

    const tutorial = await Tutorial.findById(tutorialId);
    if (!tutorial) {
      return res.status(404).json({ message: "Tutorial not found" });
    }


    const alreadyLiked = tutorial.likedBy.some(id => id.toString() === userId);
    if (alreadyLiked) {
      return res.status(400).json({ message: "You have already liked this tutorial" });
    }

    tutorial.likedBy.push(userId);
    await tutorial.save();

    res.json({
      message: "Liked successfully",
      likesCount: tutorial.likedBy.length,
      isLiked: true
    });
  } catch (err) {
    console.error("Like error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



