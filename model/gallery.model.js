import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  before: String, // Cloudinary URL
  after: String,  // Cloudinary URL
  caption: String,
});

export const Gallery = mongoose.model("Gallery", gallerySchema);


