import express from "express";
import {
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

router.post("/barcode", scanProductBarcode);
router.post("/ingredients", scanIngredientsText);
router.get("/past-scans", protectRoute, getUsersPastScans);

export default router;
