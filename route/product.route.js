import express from "express";
import multer from "multer";
import { createProduct, deleteProduct, getAllProduct,getProductById } from "../Controller/product.controller.js"; 

const router = express.Router();


// const upload = multer({ dest:"uploads/post" });

// Routes
// router.post("/", upload.single("images"), createProduct);
const upload = multer({ dest: "uploads/post" });
router.post("/", upload.array("images", 10), createProduct);
router.get("/", getAllProduct);
router.get("/",getProductById);
router.delete("/",deleteProduct);

export default router;
