const express = require('express');
const SellerItem = require('../Database/Models/SellerItem');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      dishName,
      description,
      price,
      category,
      ingredients,
      portionSize,
      customization,
      dietaryInfo,
      sellerEmail,
    } = req.body;

    if (!dishName || !price || !category || !sellerEmail) {
      return res.status(400).json({
        status: 'failed',
        message: 'Missing required fields',
      });
    }

    const existingItem = await SellerItem.findOne({ dishName, sellerEmail });
    if (existingItem) {
      return res.status(409).json({
        status: 'failed',
        message: 'This item already exists for this seller.',
      });
    }

    const sellerItem = new SellerItem({
      dishName,
      description,
      price,
      category,
      ingredients,
      portionSize,
      customization,
      dietaryInfo,
      sellerEmail,
    });

    await sellerItem.save();

    res.status(200).json({
      status: 'success',
      data: { sellerItem },
    });
  } catch (err) {
    console.error('Error saving seller item:', err);
    res.status(500).json({
      status: 'failed',
      message: 'Something went wrong while saving the item.',
    });
  }
});

module.exports = router;
