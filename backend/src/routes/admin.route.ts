import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import {
  deleteProduct,
  getAllProducts,
  getAllUsers,
  getProductReports,
  getScansByUserId,
} from "../controllers/admin.controller";
import { isAdmin } from "../middleware/admin.middleware";

const router = express.Router();

router.use(protectRoute);
router.use(isAdmin);

router.get("/products", getAllProducts);
router.get("/users", getAllUsers);
router.get("/user-scan-history/:id", getScansByUserId);
router.delete("/delete-product/:id", deleteProduct);
router.get("/product-reports/:id", protectRoute, getProductReports);

export default router;
