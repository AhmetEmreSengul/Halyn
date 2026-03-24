import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import {
  deleteProduct,
  getAllUsers,
  getScansByUserId,
} from "../controllers/admin.controller";
import { isAdmin } from "../middleware/admin.middleware";

const router = express.Router();

router.use(protectRoute);
router.use(isAdmin);

router.get("/users", getAllUsers);
router.get("/user-scan-history/:id", getScansByUserId);
router.delete("/delete-product/:id", deleteProduct);

export default router;
