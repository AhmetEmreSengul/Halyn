import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
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

    reportReason: {
      type: String,
      enum: ["inappropriate", "fake", "spam", "other"],
      required: true,
    },

    reportDescription: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Report = mongoose.model("Report", reportSchema);
