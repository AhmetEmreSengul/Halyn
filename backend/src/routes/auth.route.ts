import express from "express";
import passport from "passport";
import { protectRoute } from "../middleware/auth.middleware";
import {
  googleAuthCallback,
  login,
  logout,
  signup,
} from "../controllers/auth.controller";
import { arcjetProtection } from "../middleware/arcjet.middleware";

const router = express.Router();

router.use(arcjetProtection);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/check", protectRoute, (req, res) =>
  res.status(200).json(req.user),
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`,
  }),
  googleAuthCallback,
);

export default router;
