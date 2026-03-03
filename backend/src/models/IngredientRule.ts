import { Schema, model, HydratedDocument } from "mongoose";

export type RuleStatus = "haram" | "doubtful";

export interface IIngredientRule {
  keyword: string;
  status: RuleStatus;
  confidenceImpact: number;
  notes?: string;
  isActive: boolean;
}

export type IngredientRuleDocument = HydratedDocument<IIngredientRule>;

const ingredientRuleSchema = new Schema<IIngredientRule>(
  {
    keyword: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["haram", "doubtful"],
      required: true,
    },

    confidenceImpact: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    notes: { type: String },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const IngredientRule = model<IIngredientRule>(
  "IngredientRule",
  ingredientRuleSchema,
);
