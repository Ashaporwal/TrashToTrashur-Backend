// import mongoose from "mongoose";
import mongoose from "mongoose";

const tutorialSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    material: { type: [String], default: [] },
    steps: { type: [String], required: true },
    vedioUrl: { type: String },
    images: [{
        filename: String,
        mimetype: String,
        buffer: Buffer
    }],
    likes: { type: Number, default: 0 },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: false // or true if auth used
    }
}, { timestamps: true });

export const Tutorial = mongoose.model("tutorial", tutorialSchema);

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