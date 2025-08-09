import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Plastic", "Paper", "Fabric", "Metal", "Glass", "Cardboard", "Other"],
        required: true
    },
    images: {
        type: [String],
        default: []
    },
    tags: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    submittedBy: {
        type: String, // Agar tum ObjectId use karoge to "type: mongoose.Schema.Types.ObjectId"
        required: true
    }
}, { timestamps: true });

export const Material = mongoose.model("Material", materialSchema);
