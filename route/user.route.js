import express from "express";
import { body } from "express-validator";
import {
  createUser,
  login,
  verifyAccount,
  getAllUser,
  updateUser,
  LogOut,
  getById
} from "../Controller/user.controller.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/profile"), // folder must exist
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

const router = express.Router();

// Signup
router.post(
  "/signup",
  body("name", "Name is required").notEmpty(),
  body("name", "Only alphabets are allowed").matches(/^[A-Za-z\s]+$/),
  body("email", "Valid email is required").isEmail(),
  body("password", "Password is required").notEmpty(),
  body("contact", "Contact is required").notEmpty(),
  body("contact", "Contact must be numeric").isNumeric(),
  body("role", "Role is required").notEmpty().isIn(["crafter", "buyer"]),
  createUser
);

// Login & verify
router.post("/login", login);
router.post("/verify", verifyAccount);

// Get users
router.get("/getall", getAllUser);
router.get("/:id", getById);

// Update user profile with optional profile picture
router.put("/update/:id", upload.single("profilePicture"), updateUser);

// Logout
router.delete("/", LogOut);

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