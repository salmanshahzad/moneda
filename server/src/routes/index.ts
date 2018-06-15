import express from "express";
import authRoutes from "./auth";
import userRoutes from "./user";

const router = express.Router();
router.use(authRoutes);
router.use(userRoutes);

export default router;
