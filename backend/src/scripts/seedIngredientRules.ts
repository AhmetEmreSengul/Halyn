import mongoose from "mongoose";
import { IngredientRule } from "../models/IngredientRule";
import { ENV } from "../lib/env";

const rules = [
  {
    keywords: ["alcohol", "ethanol", "alkol", "etil alkol"],
    status: "haram",
    confidenceImpact: 100,
  },
  {
    keywords: ["wine", "şarap"],
    status: "haram",
    confidenceImpact: 100,
  },
  {
    keywords: ["gelatin", "jelatin"],
    status: "haram",
    confidenceImpact: 90,
  },
  {
    keywords: ["pork", "domuz"],
    status: "haram",
    confidenceImpact: 100,
  },
  {
    keywords: ["natural flavors", "aroma vericiler", "doğal aroma"],
    status: "doubtful",
    confidenceImpact: 40,
  },
  {
    keywords: ["lecithin", "lesitin"],
    status: "doubtful",
    confidenceImpact: 30,
  },
  {
    keywords: ["e120", "e-120", "e 120", "carmine", "cochineal", "karmin"],
    status: "haram",
    confidenceImpact: 100,
  },
];

const seedRules = async () => {
  try {
    await mongoose.connect(ENV.MONGODB_URI!);
    await IngredientRule.deleteMany({});
    await IngredientRule.insertMany(rules);

    console.log("Rules seeded");
  } catch (error) {
    console.error("Error inserting rules", error);
  }
};

seedRules();
