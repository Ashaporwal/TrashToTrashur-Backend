import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  material: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material',
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "delivered", "cancelled"],
    default: "pending"
  },
  images: {
    type: [String],
    default: []
  },
  address: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);


// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   material: {  
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Material',
//     required: true
//   },
//   buyer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   seller: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: 1
//   },
//   totalPrice: {
//     type: Number,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ["pending", "confirmed", "delivered", "cancelled"],
//     default: "pending"
//   },
//   images: {
//     type: [String],
//     default: []
//   }
// }, { timestamps: true });

// export const Order = mongoose.model("Order", orderSchema);
