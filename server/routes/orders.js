import express from 'express';
import Order from '../models/Order.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Create order
router.post('/', verifyToken, async (req, res) => {
  try {
    const { products, shippingInfo, totalAmount } = req.body;

    const order = new Order({
      userId: req.userId,
      products,
      shippingInfo,
      totalAmount,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user orders
router.get('/', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).populate('products.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
