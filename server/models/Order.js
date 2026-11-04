
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    marketId: {
        type: String,
        required: true,
        trim: true,
    },

    symbol: {
        type: String,
        required: true,
        trim: true,
    },

    baseAsset: {
        type: String,
        required: true,
        trim: true,
    },

    quoteAsset: {
        type: String,
        required: true,
        trim: true,
    },

    side: {
        type: String,
        enum: ['buy', 'sell'],
        required: true,
    },

    orderType: {
        type: String,
        enum: ['market', 'limit'],
        required: true,
    },

    // For market orders, this is the market-price snapshot
    // received when the order was submitted.
    price: {
        type: Number,
        required: true,
        min: 0,
    },

    quantity: {
        type: Number,
        required: true,
        min: 0,
    },

    total: {
        type: Number,
        required: true,
        min: 0,
    },

    status: {
        type: String,
        enum: ['pending', 'partially_filled', 'filled', 'cancelled', 'rejected'],
        default: 'pending',
    },
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
