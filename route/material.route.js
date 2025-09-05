
import express from "express";
import multer from "multer";
import {
  createMaterial,
  getAllMaterials,
  getMaterialById,
  getMaterialsByBuyer,
  getMaterialsWithSales,
  deleteMaterial,
} from "../Controller/material.controller.js";

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.post("/create", upload.single("image"), createMaterial); // image field in form-data
router.get("/all", getAllMaterials);
router.get("/:id", getMaterialById);
router.get("/getbybuyer/:buyerId", getMaterialsByBuyer);
router.get("/getwithsales/:buyerId", getMaterialsWithSales);
router.delete("/:id", deleteMaterial);

export default router;



// import express from "express";
// import { createMaterial, getAllMaterials,getMaterialsByBuyer,getMaterialsWithSales,} from "../controller/material.controller.js";
// import multer from "multer";
// import path from "path";

// const router = express.Router();

// // Multer setup for file upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });
// const upload = multer({ storage });

// // Create material with image
// router.post("/create", upload.single("image"), createMaterial);

// // Get all materials
// router.get("/getall", getAllMaterials);
// router.get("/getbybuyer/:buyerId", getMaterialsByBuyer);

// export default router;













// import express from "express";
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { createMaterial, getallMaterial, getMaterialById } from "../Controller/material.controller.js";

// // ✅ Ensure 'public/uploads' exists
// const uploadDir = path.join(process.cwd(), "public/uploads");
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// // ✅ Multer storage config
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     }
// });

// const upload = multer({ storage });

// const router = express.Router();
// router.post("/create", upload.single("image"), createMaterial);
// router.get("/getall", getallMaterial);
// router.get("/:id", getMaterialById);

// export default router;





// import express from "express";
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { createMaterial, getallMaterial, getMaterialById } from "../Controller/material.controller.js";

// // Ensure uploads folder exists
// const uploadDir = path.join(process.cwd(), "uploads");
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     }
// });

// const upload = multer({ storage });

// const router = express.Router();
// router.post("/create", upload.single("image"), createMaterial);
// router.get("/getall", getallMaterial);
// router.get("/:id", getMaterialById);

// export default router;

