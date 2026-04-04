import express from "express";
import {
  deleteScan,
  getAllScans,
  getMostPopularProducts,
  getUsersPastScans,
  scanIngredientsText,
  scanProductBarcode,
} from "../controllers/scan.controller";
import { optionalAuth } from "../middleware/optionalAuth.middleware";
import { arcjetProtection } from "../middleware/arcjet.middleware";
import { protectRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.use(optionalAuth);
router.use(arcjetProtection);

router.get("/all-scans", getAllScans);
router.post("/barcode", scanProductBarcode);
router.post("/ingredients", scanIngredientsText);
router.get("/past-scans", protectRoute, getUsersPastScans);
router.get("/popular", getMostPopularProducts);
router.delete("/delete-scan/:id", protectRoute, deleteScan);

export default router;
