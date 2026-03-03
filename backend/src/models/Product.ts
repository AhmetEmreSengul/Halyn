// src/modules/product/product.model.ts

import { Schema, model, HydratedDocument } from "mongoose";

export type HalalStatus = "halal" | "haram" | "doubtful" | "unknown";

export interface IProduct {
  barcode: string;
  name: string;
  brand?: string;

  ingredientsText?: string;
  ingredientsList: string[];

  halalStatus: HalalStatus;
  confidenceScore: number;

  analysisReasons: string[]; 

  source: "openfoodfacts";

  rawSourceData?: any; 
  analyzedAt: Date;
}

export type ProductDocument = HydratedDocument<IProduct>;

const productSchema = new Schema<IProduct>(
  {
    barcode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: { type: String, required: true },
    brand: { type: String },

    ingredientsText: { type: String },
    ingredientsList: { type: [String], default: [] },

    halalStatus: {
      type: String,
      enum: ["halal", "haram", "doubtful", "unknown"],
      required: true,
    },

    confidenceScore: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    analysisReasons: {
      type: [String],
      default: [],
    },

    source: {
      type: String,
      enum: ["openfoodfacts"],
      required: true,
    },

    rawSourceData: {
      type: Schema.Types.Mixed,
    },

    analyzedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Product = model<IProduct>("Product", productSchema);