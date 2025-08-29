// controllers/gallery.controller.js
import { Gallery } from "../model/gallery.model.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// Function to upload a single file to Cloudinary
const uploadToCloudinary = async (filePath) => {
  const result = await cloudinary.v2.uploader.upload(filePath, { folder: "gallery" });
  fs.unlinkSync(filePath); // delete temp file
  return result.secure_url; // <-- yeh string URL return kar raha hai
};


export const createGallery = async (req, res) => {
  try {
    const { caption } = req.body;

const beforeUrl = req.files["before"] ? await uploadToCloudinary(req.files["before"][0].path) : null;
const afterUrl = req.files["after"] ? await uploadToCloudinary(req.files["after"][0].path) : null;

const galleryItem = new Gallery({
  before: beforeUrl,
  after: afterUrl,
  caption,
});
await galleryItem.save();


    res.status(201).json({
      message: "Gallery item created successfully",
      galleryItem,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get all gallery entries
export const getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find();
    res.status(200).json(gallery); // Cloudinary URLs are already stored
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Delete a gallery entry
export const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    // Optional: you could remove from Cloudinary here too
    await Gallery.findByIdAndDelete(id);

    res.status(200).json({ message: "Gallery item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
