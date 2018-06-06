import * as express from "express";
import testRoutes from "./routes";

const router = express.Router();
router.use(testRoutes);

export default router;
