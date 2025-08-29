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
    price: {
  type: Number,
  required: true,
  default: 0
},
quantity: {
  type: Number,
  required: true,
  default: 1
},
    submittedBy: {
         type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    }
}, { timestamps: true });

export const Material = mongoose.model("Material", materialSchema);
