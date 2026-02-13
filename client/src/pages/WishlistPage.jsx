import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('wishlist');
      const parsed = raw ? JSON.parse(raw) : [];
      setItems(parsed);
    } catch (err) {
      console.error(err);
      setItems([]);
    }
  }, []);

  const handleRemove = (idx) => {
    const next = items.filter((_, i) => i !== idx);
    setItems(next);
    localStorage.setItem('wishlist', JSON.stringify(next));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

        {items.length === 0 ? (
          <div className="text-gray-600">Your wishlist is empty.</div>
        ) : (
          <div className="grid gap-4">
            {items.map((p, idx) => (
              <div key={idx} className="bg-white p-4 rounded shadow flex items-center gap-4">
                <img src={p.image || '/images/products/placeholder.png'} alt={p.name} className="w-20 h-20 object-cover rounded" />
                <div>
                  <Link to={`/product/${p._id}`} className="font-medium text-gray-800">{p.name}</Link>
                  <div className="text-sm text-gray-600">₹{p.price?.toLocaleString('en-IN') || '—'}</div>
                </div>
                <div className="ml-auto flex flex-col gap-2">
                  <button onClick={() => handleRemove(idx)} className="text-sm text-red-600">Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
