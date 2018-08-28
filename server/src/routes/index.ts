import express from "express";
import userRoutes from "./user";
import sessionRoutes from "./session";
import categoryRoutes from "./category";
import transactionRoutes from "./transaction";

const router = express.Router();
router.use(userRoutes);
router.use(sessionRoutes);
router.use("/user", categoryRoutes);
router.use("/user", transactionRoutes);

export default router;
