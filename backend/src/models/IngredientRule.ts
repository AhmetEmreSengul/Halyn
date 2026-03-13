import { Schema, model, HydratedDocument } from "mongoose";

export type RuleStatus = "halal" | "haram" | "doubtful";

export interface IIngredientRule {
  keywords: string[];
  status: RuleStatus;
  confidenceImpact: number;
  notes?: string;
  isActive: boolean;
}

export type IngredientRuleDocument = HydratedDocument<IIngredientRule>;

const ingredientRuleSchema = new Schema<IIngredientRule>(
  {
    keywords: {
      type: [String],
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["halal", "haram", "doubtful"],
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
