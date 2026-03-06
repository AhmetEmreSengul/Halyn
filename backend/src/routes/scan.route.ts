import express from "express";
import {
  scanIngredientsText,
  scanProductBarcode,
} from "../controllers/scan.controller";
import { optionalAuth } from "../middleware/optionalAuth.middleware";

const router = express.Router();

router.use(optionalAuth);

router.post("/barcode", scanProductBarcode);
router.post("/ingredients", scanIngredientsText);

export default router;
