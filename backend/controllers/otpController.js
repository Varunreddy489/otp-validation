import OTPMODEL from "../models/otpModel.js";
import sendEmail from "../utils/sendEmails.js";
import otpGenerator from "otp-generator";

export const sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      console.log("Email is required");
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log(otp);

    const newOTP = new OTPMODEL({ email, otp });
    await newOTP.save();

    await sendEmail({
      to: email,
      subject: "Your OTP",
      message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    });

    res.status(200).json({ success: true, message: "OTP sent successfully" });
    console.log(sendEmail);
  } catch (error) {
    console.error("Error in sendOTP:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const { email, verCode } = req.body;
    const existingOTP = await OTPMODEL.findOneAndDelete({ email, verCode });

    if (existingOTP) {
      res
        .status(200)
        .json({ success: true, message: "OTP verification successful" });
    } else {
      res.status(400).json({ success: false, error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
