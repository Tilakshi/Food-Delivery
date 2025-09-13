const express = require("express");

const SellerItem = require("../Database/Models/SellerItem");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sellerItems = await SellerItem.find({ category: "Confectionery" });

    if (!sellerItems.length) {
      return res.status(404).json({
        status: "failed",
        message: "No items found for this category.",
      });
    }

    res.status(200).json({
      status: "success",
      data: sellerItems,
    });
  } catch (err) {
    console.error("Error fetching Bakery items:", err.message);
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
});

module.exports = router;
