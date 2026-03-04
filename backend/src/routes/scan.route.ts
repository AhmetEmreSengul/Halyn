import express from "express";
import { scanProduct } from "../controllers/scan.controller";

const router = express.Router();

router.post("/", scanProduct);

export default router;
