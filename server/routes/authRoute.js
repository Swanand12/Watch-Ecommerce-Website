import express from "express";
import {
  registerController,
  loginController,
  testController,
  requestOtpController,
  verifyOtpController,
  resetPasswordController,
  updateUserProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

// REGISTER || METHOD : POST
router.post("/register", registerController);

// REGISTER || METHOD : POST
router.post("/login", loginController);

// REQUEST OTP || METHOD : POST
router.post("/request-otp", requestOtpController);

// VERIFY OTP || METHOD : POST
router.post("/verify-otp", verifyOtpController);

//  RESET PASSWORD || METHOD : POST
router.post("/reset-password", resetPasswordController);

// TEST || METHOD : GET
router.get("/test", requireSignIn, isAdmin, testController);

// USER DASHBOARD PROTECTED ROUTE || METHOD : GET
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

// ADMIN DASHBOARD PROTECTED ROUTE || METHOD : GET
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

// UPDATE USER PROFILE || METHOD : PUT
router.put("/profile", updateUserProfileController);

export default router;
