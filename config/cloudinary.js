// import cloudinary from "cloudinary";

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
  
// });

// console.log("Cloud name:", process.env.CLOUD_NAME);
// console.log("API key:", process.env.CLOUD_API_KEY);
// export default cloudinary;


import { v2 as cloudinary } from "cloudinary";
// dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default cloudinary;
