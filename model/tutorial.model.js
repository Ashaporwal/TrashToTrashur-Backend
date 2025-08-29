import mongoose from "mongoose";

const tutorialSchema = new mongoose.Schema({
  title: String,
  description: String,
  video: {
    filename: String,
    originalname: String
  },
  images: [
    {
      filename: String,
      originalname: String
    }
  ],
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

export const Tutorial = mongoose.model("Tutorial", tutorialSchema);





// const tutorialSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     material: {
//         type: [String],
//         default: []
//     },
//     steps: {
//         type: [String],
//         required: true
//     },
//     vedioUrl: {
//         type: String
//     },
//     images:[ {
//         filename:String,
//         mimetype:String,
//         buffer:Buffer
//         // type: [String],
//         // default: []
//     }],
//     likes: {
//         type: Number,
//         default: 0
//     },
//     createdBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'user',
//         required: true
//     }
// },
//     {
//         timestamps: true
//     }
// );

// export const Tutorial = mongoose.model("tutorial", tutorialSchema);