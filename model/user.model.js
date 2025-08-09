import mongoose, { get, version } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        get: (value) => {
            return value;
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    // password: {
    //     type: String,
    //     required: true,
    //     set: (value) => {
    //         console.log("settter executed..");
    //         // const saltKey = bcrypt.genSaltSync(12);
    //         // value = bcrypt.hashSync(value, saltKey);
    //         return value;
    //     }

    // },
    password: {
  type: String,
  required: true,
},

    contact: {
        type: String,
        required: true,
        isNumeric: true
    },

    profile: {
        imageName: String,
        address: String
    },
   role: {
    type: String,
    enum: ["crafter", "buyer"],
    required: true
},
profilePicture:
 {
     type: String
     },

    isVerified: {
        type: Boolean,
        default: false
    },
//     price: {
//   type: Number,
//   required: true
// },
// quantity: {
//   type: Number,
//   required: true
// }

}, { toJSON: { getters: true } }, { versionKey: false });

export const User = mongoose.model("user", userSchema);