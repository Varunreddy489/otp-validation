import Router from "express";
import { sendOTP, verifyOTP } from "../controllers/otpController.js";

const router = Router();

router.post("/sendOTP", sendOTP);
router.get("/verifyOTP", verifyOTP);

export default router;
