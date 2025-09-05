import { validationResult } from "express-validator";
import express, { request, response } from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import dotenv  from "dotenv";

dotenv.config();

// import { validationResult } from "express-validator";

export const createUser = async (req, res, next) => {
  try {
    // 🟢 Validation check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Bad request", errorMessages: errors.array() });
    }

    const { name, email, contact, password, role } = req.body;
    console.log("Signup Body:", req.body);

    const emailNormalized = email.trim().toLowerCase();
    const existing = await User.findOne({ email: emailNormalized });

    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await User.create({
      name,
      password: hashedPassword,
      contact,
      email: emailNormalized,
      role
    });

    console.log("User created:", result.email);
    return res.status(201).json({ message: "Successfully created" });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};



// export const createUser = async (request, response, next) => {
//     try {
//         const errors = validationResult(request);
//         if (!errors.isEmpty())
//             return response.status(400).json({ error: "Bad request", errorMessages: errors.array() });

//         const { name, email, contact, password, role } = request.body;
//         console.log("Signup Body:", request.body);

//         const emailNormalized = email.trim().toLowerCase();
//         const existing = await User.findOne({ email: emailNormalized });

//         console.log("Existing user check:", existing); // debug

//         if (existing) {
//             return response.status(409).json({ error: "Email already registered" });
//         }

//         const salt = await bcrypt.genSalt(12);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const result = await User.create({
//             name,
//             password: hashedPassword,
//             contact,
//             email: emailNormalized,
//             role
//         });

//         console.log("User created:", result.email);

//         await sendEmail(emailNormalized, name);

//         return response.status(201).json({ message: "Successfully created" });
//     } catch (error) {
//         console.error(error);
//         if (error.code === 11000) {
//             return response.status(409).json({ error: "Email already registered" });
//         }
//         return response.status(500).json({ error: "Internal Server error" });
//     }
// };



// export const createUser = async (request, response, next) => {
//     try {
//         const errors = validationResult(request);
//         if (!errors.isEmpty())
//             return response.status(400).json({ error: "Bad request", errorMessages: errors.array() });

//         const { name, email, contact, password, role } = request.body;
//         console.log("Signup Body:", request.body);

//         // const hashedPassword = await bcrypt.hash(password, 10);

//         const existing = await User.findOne({ email });

//         if (existing) {
//             return response.status(409).json({ error: "Email already registered" });
//         }

//         const salt = await bcrypt.genSalt(12);
//         const hashedPassword = await bcrypt.hash(password, salt);


//         let result = await User.create({ name, password: hashedPassword, contact, email, role });
//         console.log("User created:", result.email);
//         console.log("Received signup data:", { name, password: hashedPassword, contact, email, role });


//         await sendEmail(email, name);
//         return response.status(200).json({ message: "Successfully created " });

//     } catch (error) {
//         console.error(error); 
//         response.status(500).json({ error: error.message });
//         //  console.error("Signup Error:", err);
//         return response.status(500).json({ error: "Internal Server error" });

//     }
// };

export const verifyAccount = async (request, response, next) => {
    try {
        let { email } = request.body;

        let result = await User.updateOne({ email }, { $set: { isVerified: true } });
        return response.status(200).json({ message: "ACcount verified Successfully..", result });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server error" });

    }
}
export const getAllUser = async (request, response, next) => {
    try {

        let alluser = await User.find();
        
        return response.status(200).json({ message: "ALl user found Successfully", users: alluser });
    } catch (error) {

        // return response.status(500).json({ err: "Internal server error" });
        console.error(error); // Add this
        res.status(500).json({ error: error.message }); // Yeh bhi
    }
}

// export const updateUser = async(request,response,next)=>{
//     try{
//         const {id} = request.params;
//         if(!id){
//             console.log("Id not found");
//             return response.status(400).json("Id not found");
//         }
//         const {name,email,password,contact} = request.body;
//         const result = await User.updateOne(name,email,password,contact);
//         if(!result){
//             return response.status(401).json("Not updated any thing");
//         }
//         return response.status(200).json({message:"User updated successfully"});
//     }catch(err){
//         console.log(err);
//         return response.status(500).json({message:"Internal server error"});
//     }
// }

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
console.log("ID from params:", req.params.id);

    // DB se user fetch karo aur role bhi check karo
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "crafter") {
      return res.status(403).json({ message: "Not a crafter" });
    }

    // Agar sab thik hai
    return res.status(200).json({ crafter: user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Internal server error" });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Text fields
    const { name, email, contact, password } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (contact) user.contact = contact;

    // Password update
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // File update
    if (req.file) {
      user.profilePicture = `/profile/${req.file.filename}`;
    }

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


// export const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!id) return res.status(400).json({ message: "User ID is required" });

//     const user = await User.findById(id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Update fields from formData
//     const { name, email, contact, password } = req.body;
//     if (name) user.name = name;
//     if (email) user.email = email;
//     if (contact) user.contact = contact;

//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(password, salt);
//     }

//     // Handle profile picture upload
//     if (req.file) {
//       user.profilePicture = `/profile/${req.file.filename}`; // save relative path
//     }

//     await user.save();

//     return res.status(200).json({ message: "User updated successfully", user });
//   } catch (err) {
//     console.error("Update error:", err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };


export const login = async (request, response, next) => {
    try {
        const { email, password, role } = request.body; // include role
        const user = await User.findOne({ email });

        if (!user)
            return response.status(401).json({ error: "User does not exist" });

        if (!user.isVerified)
            return response.status(403).json({ error: "Account not verified" });

    
        if(user.role !== role){
            return response.status(403).json({ error: `Role mismatch! You are a ${user.role}` });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).json({ error: "Invalid password" });
        }

        const token = generateToken(user._id, user.email, user.contact);

        return response.json({
            message: "Login successful",
            token,
            user
        });
      
    } catch (err) {
        console.error("Login error:", err);
        return response.status(500).json({ error: "Internal server error" });
    }
};



// export const login = async (request, response, next) => {
//     try {
//         const { email, password } = request.body;
//         const user = await User.findOne({ email });

//         if (!user)
//             return response.status(401).json({ error: "User does not exist" });

//         if (!user.isVerified)
//             return response.status(403).json({ error: "Account not verified" });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return response.status(401).json({ error: "Invalid password" });
//         }
//         // const token = generateToken(user._id, user.email, user.contact);
//         //    response.cookie("token", token,{
             
//         //      httpOnly:true,
//         //      secure:false,
//         //      sameSite:"lax"
//         //  });
//         //     return response.status(200).json({ message: "Login Successfull" ,user,token});
//  const token = generateToken(user._id, user.email, user.contact);

//     return response.json({message: "Login successful",
//       token,
//       user
//     });
      
//     } catch (err) {
//          console.error("Login error:", err);
//         return response.status(500).json({ error: "Internal server error" });
//     }
// };


export const LogOut = async (request,response,next)=>{
    try{
        response.clearCookie("token");
        return response.status(200).json({message:"LogOut Successfully.."});
    }
    catch(err){
        return response.status(500).json({error:"Internal Server Error..."});
    }
}


const sendEmail = (email, name) => {
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        let mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Account Verification',
            html: `<h4>Dear ${name}</h4>
            <p>Thank you for registration. To verify account please click on below button</p>

                        <form method="post" action="http://localhost:5000/user/verify">
              <input type="hidden" name="email" value="${email}"/>
              <button type="submit" style="background-color: blue; color:white; width:200px; border: none; border: 1px solid grey; border-radius:10px;">Verify</button>
            </form>
            <p>
               <h6>Thank you</h6>
               
            </p>
            `
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });

}

export const updateUserProfile = async (request, response, next) => {
    try {
        const user = await User.findById(request.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.picture = req.body.picture || user.picture;

            if (req.body.password) {
                user.password = req.password;
            }
            const updatedUser = await user.save();

            response.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                picture: updateUser._id,

            })
        }
        else {
            return response.status(404).json({ error: "User does not exists" })
        }
    } catch (err) {

    }
}
export const uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const userId = req.params.userId;
        const imagePath = `/profile/${req.file.filename}`;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: imagePath },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({
            message: "Profile picture uploaded successfully",
            imageUrl: `http://localhost:5000${imagePath}`
        });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ error: "Server error while uploading file" });
    }
};

const generateToken = (userId, email, contact) => {
    let payload = { userId, email, contact };
    return jwt.sign(payload, process.env.SECRET);
};


export const getCrafters = async (req, res) => {
  try {

    const crafters = await User.find({ role: "crafter" }).select("name _id");
    return res.status(200).json({ crafters });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};




// const generateToken = (email,contact)=>{
//     let payload = {email,userId,contact};
//     return jwt.sign(payload,process.env.TOKEN_SECRET);
// }


// export const authenticateUser = async(request,response,next)=>{
//     try{
//         let{email,password} = request.body;

//         let user = await User.findOne({email});

//         if(!user.isVerified)
//             return response.status(401).json({error:"Unauthorized user | Account is not verified"});

//         if(!user)
//             return response.status(401).json({error:"Unauthorized user | Email is not FOund"});

//         let status = await bcrypt.compare(password,user.password);

//         user.password = undefined;

//         status && response.cookie("token",generateToken(user.email,user._id,user.conatct));

//         // return status? response.status(500).json({error:"Internal server error"});
//                 return status ? response.status(200).json({ message: "Sign in success",user }) : response.status(401).json({ error: "Unauthorized user | Invalid password" });
//     }
//     catch(err){
//         return response.status(500).json({error:"Internal server error"});
//     }
// }






// export const logout = async(request,response,next)=>{
//     try{

//     }catch
// }












// export const authenticateUser = async(request,response,next){
//     try{
//         let {email,password} = request.body;

//         let user = await User.findOne({email});

//         if(!user.isverfied)
//             return response.status(401).json({error:"Unauthorized user | Account is not verified"});
//         let status = await bcrypt.compare(password,user.password);
//         user.password = undefined;


//     }
// }





