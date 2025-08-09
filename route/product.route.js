import express from "express";
import { createProduct, deleted, getAllProduct, updateProduct } from "../Controller/product.controller.js";
import { body } from "express-validator";


const router = express.Router();



router.post("/",createProduct);
router.get("/",getAllProduct);
router.put("/",updateProduct);
router.delete("/:id",deleted);

export default router;