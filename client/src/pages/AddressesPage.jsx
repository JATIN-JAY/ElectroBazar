import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function AddressesPage() {
  const { user, loginUser } = useContext(CartContext);
  const initial = user?.addresses || [];
  const [addresses, setAddresses] = useState(initial);
  const [form, setForm] = useState({ fullName: '', address: '', city: '', zipCode: '' });

  const saveAddresses = (next) => {
    const token = localStorage.getItem('token');
    const updatedUser = { ...(user || {}), addresses: next };
    if (token) updatedUser.token = token;
    loginUser(updatedUser);
    setAddresses(next);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const next = [...addresses, form];
    saveAddresses(next);
    setForm({ fullName: '', address: '', city: '', zipCode: '' });
  };

  const handleRemove = (idx) => {
    const next = addresses.filter((_, i) => i !== idx);
    saveAddresses(next);
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center py-24">
      <div className="max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-2">Please log in</h2>
        <p className="text-gray-600">You need to be logged in to manage addresses.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">My Addresses</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="font-semibold mb-3">Saved Addresses</h2>
            {addresses.length === 0 ? (
              <div className="text-gray-600">No saved addresses yet.</div>
            ) : (
              <div className="space-y-3">
                {addresses.map((a, idx) => (
                  <div key={idx} className="bg-white p-4 rounded shadow flex justify-between items-start">
                    <div>
                      <div className="font-medium">{a.fullName}</div>
                      <div className="text-sm text-gray-600">{a.address}, {a.city} - {a.zipCode}</div>
                    </div>
                    <button onClick={() => handleRemove(idx)} className="text-sm text-red-600">Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="font-semibold mb-3">Add Address</h2>
            <form onSubmit={handleAdd} className="bg-white p-4 rounded shadow space-y-3">
              <input placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full px-3 py-2 border rounded" />
              <input placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full px-3 py-2 border rounded" />
              <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full px-3 py-2 border rounded" />
              <input placeholder="Zip code" value={form.zipCode} onChange={(e) => setForm({ ...form, zipCode: e.target.value })} className="w-full px-3 py-2 border rounded" />
              <div className="text-right">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
