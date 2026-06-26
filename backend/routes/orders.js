const express = require('express');
const { addOrderItems, getMyOrders, getOrders } = require('../controllers/orders');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .post(protect, addOrderItems)
    .get(protect, authorize('admin'), getOrders);

router.get('/myorders', protect, getMyOrders);

module.exports = router;
