import mongoose, { get, version } from "mongoose";


const productSchema = new mongoose.Schema({
    name:{
      type:String,
    //   required:true
    },
    title:{
        type:String,
        // required:true,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    images:{
        type:[String],   // <-- change here
        default: []
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        // required:true
    },
    stock:{
        type:Number,
        default:0
    },
    isAvailable:{
        type:Boolean,
        default:true,
        required:true
    }
});

export const Product = mongoose.model("Product",productSchema);
