import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { createMaterial, getallMaterial, getMaterialById } from "../Controller/material.controller.js";

// Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

const router = express.Router();
router.post("/create", upload.single("image"), createMaterial);
router.get("/getall", getallMaterial);
router.get("/:id", getMaterialById);

export default router;

