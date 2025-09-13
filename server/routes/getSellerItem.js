const express = require('express');
const { protect } = require('../Middleware/authMiddleware'); 
const SellerItem = require('../Database/Models/SellerItem');
const router = express.Router();

router.get('/', protect, async (req, res) => {

    try {
        if (!req.user) {
            return res.status(401).json({
                status: 'failed',
                message: 'User not authenticated.',
            });
        }

        const sellerEmail = req.user.email;
        const sellerItems = await SellerItem.find({ sellerEmail: sellerEmail });

        if (!sellerItems.length) {
            return res.status(404).json({
                status: 'failed',
                message: 'No items found for this seller.',
            });
        }

        res.status(200).json({
            status: 'success',
            data: sellerItems,
        });

    } catch (err) {
        console.error('Error fetching seller items:', err.message);
        res.status(500).json({
            status: 'failed',
            message: err.message,
        });
    }
});

module.exports = router;
