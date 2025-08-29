import express from "express";
import multer from "multer";
import { createGallery, getAllGallery, deleteGallery } from "../Controller/gallery.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "temp/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

router.post("/create", upload.fields([
  { name: "before", maxCount: 1 },
  { name: "after", maxCount: 1 }
]), createGallery);

router.get("/", getAllGallery);
router.delete("/:id", deleteGallery);

export default router;
