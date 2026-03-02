import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import passport from "passport";
import path from "path";
import authRoutes from "./routes/auth.route";
import { connectDB } from "./lib/db";
import { ENV } from "./lib/env";

const app = express();
const PORT = ENV.PORT || 3000;

app.use(cors({ origin: ENV.BASE_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/auth", authRoutes);

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*/, (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  connectDB();
});
