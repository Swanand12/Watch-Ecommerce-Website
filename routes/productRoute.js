import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {
  braintreePaymentController,
  createProductController,
  deleteProductController,
  generatePaymentTokenController,
  getPhotoController,
  getProductsController,
  getSingleProductController,
  productCountController,
  productFilterController,
  productListController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";

const router = express.Router();

// routes

// CREATE PRODUCT || METHOD : POST
router.post(
  "/create-product",

  formidable(),
  createProductController
);

// GET PRODUCTS || METHOD : GET
router.get("/get-products", getProductsController);

// GET SINGLE PRODUCT || METHOD : GET
router.get("/single-product/:slug", getSingleProductController);

// GET PHOTO || METHOD : GET
router.get("/get-photo/:pid", getPhotoController);

// UPDATE PRODUCT || METHOD : PUT
router.put(
  "/update-product/:pid",

  formidable(),
  updateProductController
);

// DELETE PRODUCT || METHOD : DELETE
router.delete(
  "/delete-product/:pid",

  deleteProductController
);

// FILTER PRODUCTS || METHOD : POST
router.post("/product-filter", productFilterController);

// COUNT FILTER PRODUCTS || METHOD : POST
router.post("/product-count", productCountController);

// PRODUCTS PAGINATION || METHOD : GET
router.post("/product-list", productListController);

// SEARCH PRODUCT || METHOD : GET
router.get("/search/:keyword", searchProductController);

// PAYMENT TOKEN GENERATION || METHOD : GET
router.get("/braintree/token", generatePaymentTokenController);

// PAYMENT, CREATE ORDER || METHOD : POST
router.post("/braintree/payments", braintreePaymentController);
export default router;
