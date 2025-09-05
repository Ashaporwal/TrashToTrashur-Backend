import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import MaterialRouter from "./route/material.route.js";
import UserRouter from "./route/user.route.js";
import ProductRouter from "./route/product.route.js";
import TutorialRouter from "./route/tutorial.route.js"; 
import galleryRoutes from "./route/gallery.route.js";
import commentRouter from "./route/comment.route.js";
import OrderRouter from "./route/order.route.js";
dotenv.config();
const app = express();


app.use(
  cors({
    origin: ["http://localhost:5173", "https://trashtotrashur-frontend.onrender.com"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/profile", express.static(path.join(path.resolve(), "public/profile")));


app.use("/user", UserRouter);
app.use("/material", MaterialRouter);
app.use("/product", ProductRouter);
app.use("/tutorial", TutorialRouter); 
app.use("/gallery", galleryRoutes);
// app.use('/comment',CommentRouter);
app.use("/comment", commentRouter);
app.use("/order",OrderRouter);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server started on port", process.env.PORT || 5000);
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
// import cors from "cors";
// import MaterialRouter from "./route/material.route.js";
// import UserRouter from "./route/user.route.js";
// import ProductRouter from "./route/product.route.js";
// import path from 'path';

// dotenv.config();
// const app = express();

// // app.use(cors({
// //     // origin: "https://trashtotrashur-frontend.onrender.com", 
// //       // origin: ['http://localhost:5173', 'https://trashtotrashur-frontend.onrender.com'], 
// //       origin:"http://localhost:5173",
// //       // origin:"*",
// //   credentials: true
// // }));

// app.use(cors({
//   origin: ["http://localhost:5173","https://trashtotrashur-frontend.onrender.com"],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

// app.use(cookieParser());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // app.use("/uploads", express.static("public/uploads"));
// // app.use("/uploads", express.static( "public/uploads"));
// // app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));
// // app.use("/uploads", express.static("uploads"));
// // app.use("/uploads", express.static("public/uploads"))

// app.use("/uploads", express.static("uploads"));

// // app.use("/uploads", express.static("uploads"));
// // app.use("/uploads", express.static("public/uploads"));
// // app.use('/profile', express.static('public/profile'));
// // app.use('./images', express.static('public/images'));



// app.use("/user", UserRouter);
// app.use("/material", MaterialRouter);
// app.use("/product", ProductRouter);

// mongoose.connect(process.env.DB_URL)
//   .then(() => {
//     console.log("DB connected");
//     app.listen(process.env.PORT || 3000, () => {
//       console.log("Server started on port", process.env.PORT || 3000);
//     });
//   })
//   .catch((err) => {
//     console.log("DB connection failed", err);
//   });


















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


