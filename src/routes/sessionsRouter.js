import express from "express";
import { getCurrentUser } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/current", authMiddleware, getCurrentUser);

export default router;
