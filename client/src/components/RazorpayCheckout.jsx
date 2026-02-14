import React, { useState } from 'react';
import api from '../api';

const RazorpayCheckout = ({ cartItems, totalPrice, shippingInfo, user, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!user) {
      onError('Please log in to continue');
      return;
    }

    if (cartItems.length === 0) {
      onError('Cart is empty');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      // Step 1: Create order in Razorpay
      const orderResponse = await api.post(
        '/payment/create-order',
        {
          amount: totalPrice,
          items: cartItems,
          userEmail: shippingInfo.email,
          userName: shippingInfo.fullName,
          userPhone: shippingInfo.zipCode, // Using zipCode as placeholder for phone
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { orderId, keyId } = orderResponse.data;

      // Step 2: Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        openRazorpayCheckout(orderId, keyId, token);
      };
      document.body.appendChild(script);
    } catch (error) {
      setLoading(false);
      onError(error.response?.data?.message || 'Failed to create payment order');
    }
  };

  const openRazorpayCheckout = (orderId, keyId, token) => {
    const options = {
      key: keyId,
      // when using an `order_id`, Razorpay uses the order's amount; avoid passing `amount` here
      currency: 'INR',
      order_id: orderId,
      name: 'PhoneHub',
      description: 'Purchase Electronics',
      image: 'https://via.placeholder.com/150',
      prefill: {
        name: shippingInfo.fullName,
        email: shippingInfo.email,
      },
      handler: async (response) => {
        // Step 3: Verify payment
        try {
          const verifyResponse = await api.post(
            '/payment/verify-payment',
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              items: cartItems,
              amount: totalPrice,
              shippingInfo,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          setLoading(false);
          onSuccess(verifyResponse.data);
        } catch (error) {
          setLoading(false);
          onError(error.response?.data?.message || 'Payment verification failed');
        }
      },
      modal: {
        ondismiss: () => {
          setLoading(false);
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading || cartItems.length === 0}
      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
    >
      {loading ? 'Processing...' : '💳 Pay with Razorpay'}
    </button>
  );
};

export default RazorpayCheckout;
