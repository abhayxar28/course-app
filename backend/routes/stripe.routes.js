import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { createStripePayOrder, verifyStripeSession } from "../controllers/stripe.controller.js";

const router = express.Router();

router.post("/create-checkout-session", isAuthenticated, createStripePayOrder)
router.post("/verify-session", isAuthenticated, verifyStripeSession)

export default router;