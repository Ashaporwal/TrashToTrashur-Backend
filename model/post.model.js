import mongoose from "mongoose";

 const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    ],
     createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

 const Post = mongoose.model("Post",postSchema);
 export default postSchema;