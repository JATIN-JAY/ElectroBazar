import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { verifyToken } from '../middleware/auth.js';
import dotenv from 'dotenv';
import Order from '../models/Order.js';

dotenv.config();

const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order for payment
router.post('/create-order', verifyToken, async (req, res) => {
  try {
    const { amount, items, userEmail, userName, userPhone } = req.body;

    // Validate input
    if (!amount || !items || !userEmail) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check maximum allowed amount (useful for test mode limits)
    const maxAmountPaise = parseInt(process.env.RAZORPAY_MAX_AMOUNT_PAISE || '1000000', 10); // default ₹10,000
    const amountPaise = Math.round(Number(amount) * 100);

    if (amountPaise > maxAmountPaise) {
      return res.status(400).json({ message: `Amount exceeds maximum allowed for payments (₹${(maxAmountPaise/100).toLocaleString()}). Try a smaller amount or update RAZORPAY_MAX_AMOUNT_PAISE in server .env for testing.` });
    }

    // Create Razorpay order
    const options = {
      amount: amountPaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        userEmail,
        userName,
        items: JSON.stringify(items),
      },
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.json({
      orderId: razorpayOrder.id,
      amount: amount,
      keyId: process.env.RAZORPAY_KEY_ID,
      email: userEmail,
      name: userName,
      phone: userPhone,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

// Verify payment
router.post('/verify-payment', verifyToken, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, items, amount, shippingInfo } = req.body;

    // Verify signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Payment is verified, create order in database
    // Normalize items to match Order schema: products -> [{ productId, quantity, price }]
    const products = (items || []).map((it) => ({
      productId: it._id || it.productId || it.id,
      quantity: it.quantity || 1,
      price: it.price || it.unitPrice || 0,
    }));

    const order = new Order({
      userId: req.userId,
      products,
      shippingInfo: shippingInfo || {},
      totalAmount: amount,
    });

    await order.save();

    res.json({
      message: 'Payment verified successfully',
      order,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Failed to verify payment' });
  }
});

export default router;
