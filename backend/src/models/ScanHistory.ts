import mongoose from "mongoose";

const scanHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    barcode: String,

    ingredientsText: String,

    scanType: {
      type: String,
      enum: ["barcode", "ingredients"],
      required: true,
    },
  },
  { timestamps: true },
);

const ScanHistory = mongoose.model("ScanHistory", scanHistorySchema);

export default ScanHistory;
