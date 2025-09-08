import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  // user: { type: String, required: true },
   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  targetId: { type: String, required: true },
  type: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Comment = mongoose.model("Comment", commentSchema);




// import mongoose from "mongoose";

// const commentSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "user",
//     required: true,
//   },
//   targetId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//   },
//   type: {
//     type: String,
//     enum: ["product", "tutorial"],
//     required: true,
//   },
//   text: {
//     type: String,
//     required: true,
//   },
// });

// export const Comment = mongoose.model("comment", commentSchema);
