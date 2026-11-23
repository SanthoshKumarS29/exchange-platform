import Order from "../../models/Order.js";

export const createOrder = async (req, res) => {
    try {
        const { marketId, symbol, baseAsset, quoteAsset, side, orderType, price, quantity } = req.body;
        if (!marketId || !symbol || !baseAsset || !quoteAsset || !side || !orderType || !price || !quantity) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const validPrice = Number(price);
        const validQuantity = Number(quantity);

        if (!Number.isFinite(validPrice) || !Number.isFinite(validQuantity) || validPrice <= 0 || validQuantity <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid price or quantity' });
        }

        if (!['buy', 'sell'].includes(side)) {
            return res.status(400).json({ success: false, message: 'Invalid side' });
        }

        if (!['market', 'limit'].includes(orderType)) {
            return res.status(400).json({ success: false, message: 'Invalid order type' });
        }

        const total = validPrice * validQuantity;

        console.log("Authenticated user in controller:", req.user);
        console.log("User ID:", req.user?.id);

        const orderData = {
            user: req.user.id,
            marketId,
            symbol,
            baseAsset,
            quoteAsset,
            side,
            orderType,
            price: validPrice,
            quantity: validQuantity,
            total,
        };

        console.log("Order data before saving:", orderData);

        const order = await Order.create(orderData);

        return res.status(201).json({ success: true, order, message: 'Order created successfully' });

    } catch (err) {
        console.error('Error creating order:', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, orders });
    } catch (err) {
        console.error('Error fetching orders:', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


export const getOrderBook = async (req, res) => {
    try {
        const { marketId } = req.params;

        if (!marketId) {
            return res.status(400).json({
                success: false,
                message: 'Market ID is required',
            });
        }

        // Buy orders: highest price first
        const buyOrders = await Order.find({
            marketId,
            side: 'buy',
            orderType: 'limit',
            status: { $in: ['pending', 'partially_filled'] },
        })
            .sort({ price: -1, createdAt: 1 })
            .select('price quantity symbol side orderType status createdAt');

        // Sell orders: lowest price first
        const sellOrders = await Order.find({
            marketId,
            side: 'sell',
            orderType: 'limit',
            status: { $in: ['pending', 'partially_filled'] },
        })
            .sort({ price: 1, createdAt: 1 })
            .select('price quantity symbol side orderType status createdAt');
            
        console.log({ marketId, bids: buyOrders.length, asks: sellOrders.length });
        return res.status(200).json({
            success: true,
            marketId,
            orderBook: {
                bids: buyOrders,
                asks: sellOrders,
            },
        });


    } catch (error) {
        console.error('Get order book error:', error);

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch order book',
        });
    }
};
