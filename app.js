import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import MaterialRouter from "./route/material.route.js";
import UserRouter from "./route/user.route.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static uploads
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/user", UserRouter);
app.use("/material", MaterialRouter);

mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("DB connected");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server started on port", process.env.PORT || 3000);
    });
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });


















// import express from "express";
// import mongoose from "mongoose";

// import dotenv from "dotenv";
// import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";
// import UserRouter from "./route/user.route.js";
// import ProductRouter from "./route/product.route.js";
// import OrderRouter from "./route/order.route.js";
// import CommentRouter from "./route/comment.route.js";
// import TutorialRouter from "./route/tutorial.route.js";
// import cors from "cors";
// import  MaterialRouter from "./route/material.route.js";
// import multer from "multer";

// dotenv.config();
// const app = express();


// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));
// // app.use(cors());

//       app.use(cookieParser());
//       app.use(express.json());
//     // app.use(bodyParser.json());
//     app.use(bodyParser.urlencoded({extended:true}));

//     // app.use(cors(){
//     //   origin:"http://localhost:5173",
//     //   credentials:true
//     // })
//     app.use('/uploads', express.static('uploads'));
//     app.use('/profile', express.static('public/profile'));
//  app.use("/user",UserRouter); 
//  app.use("/product",ProductRouter);
//  app.use("/order",OrderRouter);
//  app.use("/comment",CommentRouter);
//  app.use("/tutorial",TutorialRouter);
//  app.use("/material",MaterialRouter);

// mongoose.connect(process.env.DB_URL)
//   .then(() => {
//     console.log("DB connected ");

//     app.listen(process.env.PORT || 3000, () => {
//       console.log("Server started on port", process.env.PORT || 3000);
//     });
//   })
//   .catch((err) => {
//     console.log("DB failed ", err);
//   });


