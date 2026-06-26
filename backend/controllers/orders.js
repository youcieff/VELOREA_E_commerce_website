const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.addOrderItems = async (req, res, next) => {
    try {
        const { orderItems, totalPrice } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ success: false, error: 'No order items' });
        }

        const order = await Order.create({
            orderItems,
            user: req.user.id,
            totalPrice
        });

        // Update stock levels
        for (const item of orderItems) {
           await Product.findByIdAndUpdate(item.product, {
              $inc: { countInStock: -item.qty }
           });
        }

        res.status(201).json({ success: true, data: order });
    } catch (err) {
        next(err);
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user.id });
        res.status(200).json({ success: true, data: orders });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate('user', 'id name');
        res.status(200).json({ success: true, data: orders });
    } catch (err) {
        next(err);
    }
};
