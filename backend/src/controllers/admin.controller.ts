import { Request, Response } from "express";
import User from "../models/User";
import ScanHistory from "../models/ScanHistory";
import { Product } from "../models/Product";

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
    const scanHistory = await ScanHistory.find({ userId: id });

    if (scanHistory.length === 0) {
      return res.status(404).json({ message: "Scan history not found" });
    }

    res.status(200).json(scanHistory);
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
