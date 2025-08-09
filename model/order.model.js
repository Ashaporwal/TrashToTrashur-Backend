import mongoose, { Schema } from "mongoose";
import { Product } from "../model/product.model.js";
import { User } from "../model/user.model.js";


const  orderSchema = new mongoose.Schema({
  product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'product',
    required:true
  },
  buyer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
  },
   images: {  
        type: String,
        default: "",
    },
  quantity:{
    type:Number,
    required:true,
    min:1,
  },
  totalPrice:{
    type:Number,
    required:true
  },
  status:{
    type:String,
    enum:["pending","conform","delivered","cancelled"],
    default:"pending"
  },
  createdAt:{
    type:Date,
    default :Date.now
  }
});

export const Order = mongoose.model("order",orderSchema);