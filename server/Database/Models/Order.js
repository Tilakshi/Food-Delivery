const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SellerItem',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    sellerEmail: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    itemPrice: {
        type: Number,
        required: true
    }
});

const OrderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buyer',
        required: true
    },
    items: [OrderItemSchema],
    totalAmount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['COD'],
        default: 'COD'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid'],
        default: 'pending'
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    specialInstructions: {
        type: String
    },
    sellers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seller'
        }
    ]
}, { timestamps: true }); // adds createdAt and updatedAt

// Fix: Safely compute unique seller IDs
OrderSchema.pre('save', function (next) {
    try {
        if (this.isNew && Array.isArray(this.items)) {
            const sellerIds = this.items
                .map(item => item?.seller?.toString())
                .filter(Boolean);
            this.sellers = [...new Set(sellerIds)];
        }
        next();
    } catch (err) {
        console.error('Error in pre-save hook:', err);
        next(err);
    }
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
