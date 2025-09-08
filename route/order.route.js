import express from "express";
import { createOrder, updateOrderStatus, getOrderByCrafter, getOrderByUser } from "../Controller/order.controller.js";

const router = express.Router();

// Create order
router.post("/", createOrder);

// Get orders by crafterId
router.get("/getbycrafter/:crafterId", getOrderByCrafter);

// Get orders by userId
// router.get("/getbyuser/:userId", getOrderByUser);
router.get("/user/:userId", getOrderByUser);  
router.put("/", updateOrderStatus);

// Update order status
router.put("/", updateOrderStatus);

export default router;
