import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

export default function OrdersPage() {
  const { user } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data || []);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center py-24">
        <div className="max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-2">Please log in</h2>
          <p className="text-gray-600">You need to be logged in to view your orders.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
          <p className="text-gray-600">Orders placed by {user?.name}</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">{error}</div>
        )}

        {loading ? (
          <div className="text-center py-12">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">You have no orders yet.</div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Order ID</div>
                    <div className="font-medium text-gray-800">{order._id}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Placed</div>
                    <div className="font-medium text-gray-800">{new Date(order.createdAt).toLocaleString('en-IN')}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Items</h3>
                    <div className="divide-y divide-gray-100">
                      {order.products.map((p, idx) => (
                        <div key={idx} className="py-3 flex items-center gap-4">
                          <img
                            src={p.productId?.image || '/images/products/placeholder.png'}
                            alt={p.productId?.name || 'Product'}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <div className="font-medium text-gray-800">{p.productId?.name || 'Product'}</div>
                            <div className="text-sm text-gray-600">Qty: {p.quantity}</div>
                          </div>
                          <div className="ml-auto font-semibold text-gray-800">₹{p.price.toLocaleString('en-IN')}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Summary</h3>
                    <div className="text-sm text-gray-600 mb-1">Shipping</div>
                    <div className="text-sm text-gray-800 mb-3">{order.shippingInfo?.fullName}</div>
                    <div className="text-sm text-gray-600">Total</div>
                    <div className="text-xl font-bold text-gray-900">₹{order.totalAmount.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
