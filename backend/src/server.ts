import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import passport from "./lib/google";
import path from "path";
import authRoutes from "./routes/auth.route";
import scanRoutes from "./routes/scan.route";
import { connectDB } from "./lib/db";
import { ENV } from "./lib/env";

const PORT = ENV.PORT || 3000;

const app = express();

app.use(cookieParser());
app.use(cors({ origin: ENV.BASE_URL, credentials: true }));
app.use(express.json());
app.use(passport.initialize());
app.set("trust proxy", 1);

app.use("/auth", authRoutes);
app.use("/scan", scanRoutes);

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get(/.*/, (_, res) => {
    res.sendFile(path.join(__dirname, ".../../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  connectDB();
});
