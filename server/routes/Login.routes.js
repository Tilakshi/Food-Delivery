const express = require("express");
const Buyer = require("../Database/Models/buyers");
const Seller=require("../Database/Models/Seller")
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
console.log("JWT_SECRET:", process.env.JWT_SECRET);


router.post("/", async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Debugging

    const { email, password } = req.body;

    let user = await Buyer.findOne({ email });
    if (!user) {
        user = await Seller.findOne({ email }); // If not found, check in Seller collection
      }


    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      token: token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      status: "failed",
      message: "An error occurred while processing your request",
    });
  }
});

module.exports = router;
