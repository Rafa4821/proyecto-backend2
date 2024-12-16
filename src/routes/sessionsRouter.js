import express from "express";
import { getCurrentUser } from "../controllers/userController.js";
import passport from "passport";

const router = express.Router();


router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  getCurrentUser
);

export default router;
