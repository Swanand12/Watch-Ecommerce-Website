import express from "express";
import {
  getAllOrdersController,
  getOrdersController,
  updateStatusController,
} from "../controllers/orderController.js";

// router object
const router = express.Router();

// USER ORDERS || METHOD GET
router.get("/orders/:userid", getOrdersController);

// ADMIN GET ALL ORDERS || METHOD : GET
router.get("/all-orders", getAllOrdersController);

// ADMIN ORDER STATUS UPDATE || METHOD : PUT
router.put("/update-status/:orderId", updateStatusController);

export default router;
