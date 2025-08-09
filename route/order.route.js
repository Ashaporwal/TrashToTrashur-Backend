import express from "express";
import { body } from "express-validator";
import { createOrder,getAllOrders,getOrderByUser,updateOrderStatus ,deletedOrder} from "../Controller/order.controller.js";

const router = express.Router();

router.post("/",createOrder);
router.get('/',getAllOrders);
router.get('/',getOrderByUser);
router.put('/',updateOrderStatus);
router.delete('/',deletedOrder);

export default router;