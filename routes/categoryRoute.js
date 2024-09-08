import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

// routes

// CREATE CATEGORY || METHOD POST
router.post(
  "/create-category",

  createCategoryController
);

// UPDATE CATEGORY || METHOD : PUT
router.put(
  "/update-category/:id",

  updateCategoryController
);

//  GET ALL CATEGORIES || METHOD : GET
router.get("/get-all-category", getAllCategoryController);

//  GET SINGLE CATEGORY || METHOD : GET
router.get("/single-category/:slug", getSingleCategoryController);

//  DELETE CATEGORY || METHOD : GET
router.delete(
  "/delete-category/:id",

  deleteCategoryController
);

export default router;
