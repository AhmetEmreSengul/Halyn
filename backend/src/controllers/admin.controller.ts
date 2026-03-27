import { Request, Response } from "express";
import User from "../models/User";
import ScanHistory from "../models/ScanHistory";
import { Product } from "../models/Product";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();

    if (!products) {
      return res.status(404).json({ message: "Products not found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({
      _id: { $ne: (req.user as any)._id },
      role: "user",
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getScansByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const scanHistory = await ScanHistory.find({ userId: id }).populate(
      "productId",
    );

    if (scanHistory.length === 0) {
      return res.status(404).json({ message: "Scan history not found" });
    }

    const scansWithStatus = scanHistory.map((scan) => ({
      ...scan.toObject(),
      productDeleted: scan.productId === null,
    }));

    return res.status(200).json(scansWithStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
