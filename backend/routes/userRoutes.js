import express from "express";
import Users from "../models/user.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/auth.js";

export const router = express.Router();

// user signup
router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { fullName, email, password } = req.body;

    const userExist = await Users.findOne({ email });
    if (userExist) {
      return res.json({ success: false, message: "User already exist" });
    }
const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      fullName,
      email,
      password: hashedPassword,
    });
    res.json({ success: true, message: "signup successfully",
         user: {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
  },});
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//user login
router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const userExist = await Users.findOne({ email });
    if (!userExist) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, userExist.password)
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
    //JWT token
    const token = jwt.sign(
      {
        id: userExist._id,
        email: userExist.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    //save token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });

    res.json({
      success: true,
      message: "Login successfully",
      token: token,
      user: {
        id: userExist._id,
        fullName: userExist.fullName,
        email: userExist.email,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

//user logout
router.post("/logout", (_, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logout successfully" });
});

//PROTECTED PROFILE ROUTE
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});