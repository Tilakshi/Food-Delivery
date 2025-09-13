const express = require('express');
const router = express.Router();
const Order = require('../Database/Models/Order');
const SellerItem = require('../Database/Models/SellerItem');

// No middleware – manual buyer entry
router.post('/', async (req, res) => {
    try {
        const {
            buyer, 
            items: requestedItems,
            deliveryAddress,
            specialInstructions
        } = req.body;

        if (!buyer || !requestedItems || requestedItems.length === 0 || !deliveryAddress) {
            return res.status(400).json({ message: 'Missing required order information.' });
        }

        const orderItems = [];
        let totalAmount = 0;
        const sellerMap = new Map();

        await Promise.all(requestedItems.map(async (requestedItem) => {
            const { item: sellerItemId, quantity } = requestedItem;

            const sellerItem = await SellerItem.findById(sellerItemId).populate('seller');
            if (!sellerItem) {
                throw new Error(`Seller item not found: ${sellerItemId}`);
            }

            const { price, seller, name } = sellerItem;
            const itemTotal = price * quantity;

            orderItems.push({
                item: sellerItem._id,
                seller: seller._id,
                sellerEmail: seller.email,
                quantity,
                itemPrice: price,
            });

            totalAmount += itemTotal;

            if (!sellerMap.has(seller._id.toString())) {
                sellerMap.set(seller._id.toString(), { seller, items: [] });
            }

            sellerMap.get(seller._id.toString()).items.push({
                name,
                quantity,
                price
            });
        }));

        const newOrder = new Order({
            buyer,
            items: orderItems,
            totalAmount,
            deliveryAddress,
            specialInstructions,
            paymentMethod: 'COD',
            paymentStatus: 'pending'
        });

        const savedOrder = await newOrder.save();

        for (const [sellerId, sellerData] of sellerMap.entries()) {
            const { seller, items } = sellerData;
            console.log(`New COD order for seller: ${seller.email} (ID: ${sellerId})`, items, `Order ID: ${savedOrder._id}`);
        }

        res.status(201).json({ message: 'COD order placed successfully!', orderId: savedOrder._id });
    } catch (error) {
        console.error('Error placing COD order:', error);
        res.status(500).json({ message: 'Failed to place COD order.', error: error.message });
    }
});

module.exports = router;
