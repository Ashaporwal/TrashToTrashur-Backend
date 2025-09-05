import express from "express";
import { body } from "express-validator";
import { createOrder,updateOrderStatus , getOrderByCrafter} from "../Controller/order.controller.js";

const router = express.Router();

router.post("/",createOrder);
// router.get('/getall',getAllOrders);
// router.get('/',getOrderByUser);
router.get('/getbycrafter/:crafterId', getOrderByCrafter);
router.put('/',updateOrderStatus);
// router.delete('/',deletedOrder);

export default router;