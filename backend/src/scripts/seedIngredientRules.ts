import mongoose from "mongoose";
import { IngredientRule } from "../models/IngredientRule";
import { ENV } from "../lib/env";

const rules = [
  {
    keyword: "alcohol",
    status: "haram",
    confidenceImpact: 100,
  },
  {
    keyword: "ethanol",
    status: "haram",
    confidenceImpact: 100,
  },
  {
    keyword: "wine",
    status: "haram",
    confidenceImpact: 100,
  },
  {
    keyword: "whiskey",
    status: "haram",
    confidenceImpact: 100,
  },
  {
    keyword: "gelatin",
    status: "haram",
    confidenceImpact: 90,
  },
  {
    keyword: "pork",
    status: "haram",
    confidenceImpact: 100,
  },
  {
    keyword: "e120",
    status: "haram",
    confidenceImpact: 95,
  },

  {
    keyword: "natural flavors",
    status: "doubtful",
    confidenceImpact: 40,
  },
  {
    keyword: "flavoring",
    status: "doubtful",
    confidenceImpact: 40,
  },
  {
    keyword: "mono and diglycerides",
    status: "doubtful",
    confidenceImpact: 40,
  },
  {
    keyword: "glycerin",
    status: "doubtful",
    confidenceImpact: 30,
  },
  {
    keyword: "lecithin",
    status: "doubtful",
    confidenceImpact: 30,
  },
  {
    keyword: "beeswax",
    status: "doubtful",
    confidenceImpact: 20,
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
