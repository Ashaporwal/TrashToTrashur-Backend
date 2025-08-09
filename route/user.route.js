
import express from "express";
import { body } from "express-validator";
import {createUser, login, verifyAccount, getAllUser, updateUser,uploadProfilePicture } from "../controller/user.controller.js";
import { User } from "../model/user.model.js";
import multer from "multer";
const upload = multer({dest:"public/profile"});

const router = express.Router();

router.post("/signup",
  body("name", "Name is required").notEmpty(),
  // body("name", "Only alphabets are allowed").isAlpha(),
  body("name", "Only alphabets are allowed").matches(/^[A-Za-z\s]+$/),
  body("email", "Valid email is required").isEmail(),
  body("password", "Password is required").notEmpty(),
  body("contact", "Contact is required").notEmpty(),
  body("contact", "Contact must be numeric").isNumeric(),
  body("role", "Role is required").notEmpty().isIn(["crafter", "buyer"]),
  createUser
);


router.post("/login",login);
router.post("/verify",verifyAccount);
// router.patch("/profile/:userId",upload.single("imageName"),createProfile);
// router.get("/:userId",fetchUser);
router.get("/getall",getAllUser);
router.patch("/uploadFile/:userId",upload.single("imageName"),uploadProfilePicture);
router.put("/update",updateUser);
export default router;



// import express from "express";
// import { createUser,verifyAccount,login ,getAllUser,updateUser} from "../Controller/user.controller.js";
// import { body } from "express-validator";

// const router = express.Router();

// // router.get("/",list);

// // router.post("/","name","name is required").notEmpty(),
// // body("name", "only alphabets are required".isAlpha(),
// // body("email","email is required").notEmpty(),
// // body("password","password is required").isEmail(),
// // body("contact","contact number is required").notEmpty(),
// // body("contact","only digit are allowed"),
// // createUser
// // );


// // router.post("/",auth);

// router.post( "/user",body("name","name is required").notEmpty(),
// body("name","Only Aplhabet is required").isAlpha(),
// body("email","email id is required").isEmail(),
// body("password","password is required").notEmpty(),
// body("contact","COntact is required").notEmpty(),
// body("contact","conatct number should be in digit").isNumeric(),
// createUser);
// router.post("/verification",verifyAccount);
// // router.post("/authenticate",authenticateUser);   
// router.get("/",getAllUser);
// router.put("/:id",updateUser);
// router.post("/login",login);
// // router.route("/profile".post(protect,updateUserProfile))

// export default router;