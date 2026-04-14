import { Request, Response } from "express";
import User from "../models/User";
import ScanHistory from "../models/ScanHistory";
import { Product } from "../models/Product";
import { Report } from "../models/Reports";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalProducts = await Product.countDocuments({ _id: { $ne: null } });

    if (!products) {
      return res.status(404).json({ message: "Products not found" });
    }

    res.status(200).json({
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find({
      _id: { $ne: (req.user as any)._id },
      role: "user",
    })
      .skip(skip)
      .limit(limit)
      .select("-password");

    const totalUsers = await User.countDocuments({
      _id: { $ne: (req.user as any)._id },
      role: "user",
    });

    res.status(200).json({
      users,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
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

export const getProductReports = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const reports = await Report.find({ productId: id })
      .populate("userId")
      .lean();

    const formatted = reports.map(({ userId, ...rest }) => ({
      ...rest,
      user: userId,
    }));

    return res.status(200).json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
