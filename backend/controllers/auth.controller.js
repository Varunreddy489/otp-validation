import bcrypt from "bcryptjs";

import generateTokenAndSetCookie from "../utils/genToken.js";
import User from "../models/auth.model.js";

export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      gender,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(409).json({ error: "Uysername already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    console.log(hashedPass);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${firstName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${firstName}`;

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPass,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(402).json({ error: "Internal server error" });
    }
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const login = (req, res) => {
  // try {
  //   const { email, password } = req.body;
  // } catch (error) {}
};
export const logout = (req, res) => {
  console.log("signup");
};
