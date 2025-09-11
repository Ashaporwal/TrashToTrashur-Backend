

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    enum: ["crafter", "buyer"],
    required: true,
  },
  profilePicture: {
    type: String,
    default: "/profile/default.png",
  },
  bio: {
    type: String,
    default: "",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  cart: [
    {
      materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
      quantity: Number,
      color: String,
      size: String
    }
  ],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Material" }]
}, { toJSON: { getters: true }, versionKey: false });


export const User = mongoose.model("User", userSchema);



// import mongoose, { get, version } from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true,
//         get: (value) => {
//             return value;
//         }
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     // password: {
//     //     type: String,
//     //     required: true,
//     //     set: (value) => {
//     //         console.log("settter executed..");
//     //         // const saltKey = bcrypt.genSaltSync(12);
//     //         // value = bcrypt.hashSync(value, saltKey);
//     //         return value;
//     //     }

//     // },
//     password: {
//   type: String,
//   required: true,
// },

//     contact: {
//         type: String,
//         required: true,
//         // isNumeric: true
//     },

//     profile: {
//         imageName: String,
//         address: String
//     },
// profilePicture: {
//      type: String, 
//      default: "/profile/default.png"
//      },


//    role: {
//     type: String,
//     enum: ["crafter", "buyer"],
//     required: true
// },
// profilePicture:
//  {
//      type: String
//      },

//     isVerified: {
//         type: Boolean,
//         default: false
//     },
// //     price: {
// //   type: Number,
// //   required: true
// // },
// // quantity: {
// //   type: Number,
// //   required: true
// // }

// }, { toJSON: { getters: true } }, { versionKey: false });

// export const User = mongoose.model("User", userSchema);