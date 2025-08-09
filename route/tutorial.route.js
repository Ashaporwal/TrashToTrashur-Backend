import express from "express";
import multer from "multer";
import {
  createTutorial,
  getallTutorial,
  getTutorialById,
  deleteTutorial,
} from "../Controller/tutorial.controller.js";

const router = express.Router();

// Disk storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Upload video + images
router.post(
  "/create",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "images", maxCount: 5 }
  ]),
  createTutorial
);

router.get("/getutorials", getallTutorial);
router.get("/:id", getTutorialById);
router.delete("/:id", deleteTutorial);

export default router;




// import express from "express";
// import multer from "multer";
// import {
//   createTutorial,
//   getallTutorial,
//   getTutorialById,
//   deleteTutorial,
// } from "../Controller/tutorial.controller.js";

// const router = express.Router();
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// router.post("/create", upload.fields([
//   { name: "video", maxCount: 1 },
//   { name: "images", maxCount: 5 },
// ]), createTutorial);

// router.get("/getutorials", getallTutorial);
// router.get("/:id", getTutorialById);
// router.delete("/:id", deleteTutorial);

// export default router;



// import express from "express";
// import { createProduct, deleted, getAllProduct, updateProduct } from "../Controller/product.controller.js";
// import { body } from "express-validator";
// import { createTutorial, getallTutorial, getTutorialById,deleteTutorial } from "../Controller/tutorial.controller.js";
// import multer from "multer";

// const router = express.Router();
// const storage = multer.memoryStorage();
// const upload = multer({ storage });


// router.post("/create",upload.array("images"),createTutorial);
// router.get("/",getallTutorial);
// router.get("/:id",getTutorialById);
// router.delete("/:id",deleteTutorial);

// export default router;