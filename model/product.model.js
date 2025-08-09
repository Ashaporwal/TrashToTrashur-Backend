import mongoose, { get, version } from "mongoose";
import { User } from "../model/user.model.js";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
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
        type:[String],
        default:[]
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
       required:true
    },
    stock:{
        type:Number,
        required:true
    },
    isAvailable:{
        type:Boolean,
        default:true,
        required:true,

    }
});

export const Product = mongoose.model("Product",productSchema);
