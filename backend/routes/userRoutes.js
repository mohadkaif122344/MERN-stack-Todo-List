import express from "express";
import Users from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/auth.js";

export const router = express.Router();

// User Signup
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const userExist = await Users.findOne({ email });
    if (userExist) {
      return res.json({
        success: false,
        message: "User already exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await Users.create({
      fullName,
      email,
      password: hashedPassword,
    });

    res.json({
      success: true,
      message: "Signup successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await Users.findOne({ email });
    if (!userExist) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

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

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });
    res.json({
      success: true,
      message: "Login successfully",
      token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
});

// User Logout
router.post("/logout", (_, res) => {
  res.clearCookie("token");
  res.json({
    success: true,
    message: "Logout successfully",
  });
});

// Protected Profile Route
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});
