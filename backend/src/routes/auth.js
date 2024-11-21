import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../schema/User.js";

const router = express.Router();

// Signup Endpoint
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error." });
  }
});

// Signin Endpoint
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      message: "Authentication successful",
      token: token,
    });;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
});

export default router;
