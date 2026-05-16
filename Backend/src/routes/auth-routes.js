import express from "express";
import * as authController from "../controller/auth.controller.js";
import * as authUser from "../middleware/auth.middleware.js";

const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUser);

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post("/login", authController.loginUser);

/**
 * @route GET /api/auth/logout
 * @desc Logout a user
 * @access Public
 */
authRouter.get("/logout", authController.logoutUser);

/**
 * @route GET /api/auth/profile
 * @desc Get user profile
 * @access Private
 */
authRouter.get("/profile", authUser.authUser, authController.getUserProfile);

export default authRouter;  // ✅ ES module export