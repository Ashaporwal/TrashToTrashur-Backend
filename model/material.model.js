
import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  quantity: Number,
  category: String,
  images: [String],
  tags: [String],
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: String,
  totalSold: Number
});

export const Material = mongoose.model("Material", materialSchema);



// import mongoose from "mongoose";

// const materialSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     category: {
//         type: String,
//         enum: ["Plastic", "Paper", "Fabric", "Metal", "Glass", "Cardboard", "Other"],
//         required: true
//     },
//     images: {
//         type: [String],
//         default: []
//     },
//     tags: {
//         type: [String],
//         default: []
//     },
//     status: {
//         type: String,
//         enum: ["pending", "approved", "rejected"],
//         default: "pending"
//     },
//     price: {
//   type: Number,
//   required: true,
//   default: 1
// },
// quantity: {
//   type: Number,
//   required: true,
//   default: 1
// },
//     submittedBy: {
//          type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref:"User"
//     }
// }, { timestamps: true });

// export const Material = mongoose.model("Material", materialSchema);
