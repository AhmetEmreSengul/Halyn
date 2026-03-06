import express from "express";
import {
  scanIngredientsText,
  scanProductBarcode,
} from "../controllers/scan.controller";
import { optionalAuth } from "../middleware/optionalAuth.middleware";
import { arcjetProtection } from "../middleware/arcjet.middleware";

const router = express.Router();

router.use(optionalAuth);
router.use(arcjetProtection)

router.post("/barcode", scanProductBarcode);
router.post("/ingredients", scanIngredientsText);

export default router;
