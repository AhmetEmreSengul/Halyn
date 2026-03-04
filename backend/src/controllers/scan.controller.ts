import { Request, Response } from "express";
import { Product } from "../models/Product";
import axios from "axios";
import { analyzeIngredients } from "../lib/utils";

export const scanProduct = async (req: Request, res: Response) => {
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

    const existing = await Product.findOne({ barcode });
    if (existing) {
      return res.json(existing);
    }

    const response = await axios.get(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
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

    return res.json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Scan failed" });
  }
};
