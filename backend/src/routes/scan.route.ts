import express from "express";
import { scanIngredientsText, scanProductBarcode } from "../controllers/scan.controller";

const router = express.Router();

router.post("/barcode", scanProductBarcode);
router.post("/ingredients", scanIngredientsText);

export default router;
