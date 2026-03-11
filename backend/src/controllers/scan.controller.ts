import { Request, Response } from "express";
import { Product } from "../models/Product";
import axios from "axios";
import { analyzeIngredients } from "../lib/utils";
import ScanHistory from "../models/ScanHistory";

export const scanProductBarcode = async (req: Request, res: Response) => {
  try {
    const { barcode } = req.body;

    if (!barcode || typeof barcode !== "string") {
      return res.status(400).json({ message: "Invalid barcode" });
    }

    const isValidBarcode = /^\d{12,13}$/.test(barcode);

    if (!isValidBarcode) {
      return res.status(400).json({
        message: "Invalid barcode format",
      });
    }

    const existingScan = await ScanHistory.findOne({ barcode });

    const existingProduct = await Product.findOne({ barcode });
    if (existingProduct) {
      if (!existingScan) {
        if (req.user) {
          await ScanHistory.create({
            userId: (req.user as any)._id,
            productId: existingProduct._id,
            barcode,
            scanType: "barcode",
          });
        }
      }
      return res.status(200).json(existingProduct);
    }

    const response = await axios.get(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}`,
    );

    if ((response.data as any).status === 0) {
      return res.status(404).json({
        message: "Product not found in database",
      });
    }

    const productData = (response.data as any).product;

    if (!productData) {
      return res.status(404).json({ message: "Product not found" });
    }

    const ingredientsText = productData.ingredients_text || "";
    const ingredientsList =
      productData.ingredients?.map((i: any) => i.text) || [];

    const analysis = await analyzeIngredients(ingredientsText);

    const newProduct = await Product.create({
      barcode,
      name: productData.product_name || "Unknown",
      brand: productData.brands || "",
      ingredientsText,
      ingredientsList,
      halalStatus: analysis.status,
      confidenceScore: analysis.confidence,
      analysisReasons: analysis.reasons,
      source: "openfoodfacts",
      rawSourceData: {
        completeness: productData.completeness,
        last_modified_t: productData.last_modified_t,
      },
    });

    if (req.user) {
      if (!existingScan) {
        await ScanHistory.create({
          userId: (req.user as any)._id,
          productId: newProduct._id,
          barcode,
          scanType: "barcode",
        });
      }
    }

    return res.json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Scan failed" });
  }
};

export const scanIngredientsText = async (req: Request, res: Response) => {
  try {
    const { ingredientsText } = req.body;

    if (!ingredientsText || typeof ingredientsText !== "string") {
      return res.status(400).json({
        message: "Invalid ingredients text",
      });
    }

    const existing = await ScanHistory.findOne({
      ingredientsText,
      scanType: "ingredients",
    });

    if (existing) {
      if (req.user) {
        await ScanHistory.create({
          userId: (req.user as any)._id,
          ingredientsText,
          scanType: "ingredients",
        });
      }
      return res.status(200).json(existing);
    }

    const analysis = await analyzeIngredients(ingredientsText);

    if (req.user) {
      await ScanHistory.create({
        userId: (req.user as any)._id,
        ingredientsText,
        scanType: "ingredients",
      });
    }

    return res.json({
      ingredientsText,
      halalStatus: analysis.status,
      confidenceScore: analysis.confidence,
      analysisReasons: analysis.reasons,
      source: "user_scan",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ingredient scan failed",
    });
  }
};

export const getUsersPastScans = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any)._id;

    const scans = await ScanHistory.find({ userId })
      .sort({ createdAt: -1 })
      .populate("productId");

    if (!scans) {
      return res.status(404).json({ message: "Scans not found" });
    }

    return res.status(200).json(scans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
