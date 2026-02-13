import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function ProfilePage() {
  const { user, loginUser } = useContext(CartContext);
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ name: user?.name || '', phone: user?.phone || '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const updatedUser = { ...(user || {}), name: draft.name, email, phone: draft.phone };
      if (token) updatedUser.token = token;
      loginUser(updatedUser);
      setName(draft.name);
      setPhone(draft.phone);
      setEditing(false);
      alert('Profile updated');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setDraft({ name: user?.name || '', phone: user?.phone || '' });
    setEditing(false);
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center py-24">
      <div className="max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-2">Please log in</h2>
        <p className="text-gray-600">You need to be logged in to edit your profile.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Profile</h1>
          {!editing ? (
            <button onClick={() => { setDraft({ name, phone }); setEditing(true); }} className="px-4 py-2 bg-indigo-600 text-white rounded">Edit Profile</button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleCancel} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
          <label className="block mb-4">
            <div className="text-sm text-gray-600 mb-1">Name</div>
            <input value={editing ? draft.name : name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} readOnly={!editing} className={`w-full px-3 py-2 border rounded ${!editing ? 'bg-gray-100' : ''}`} />
          </label>

          <label className="block mb-4">
            <div className="text-sm text-gray-600 mb-1">Email (read-only)</div>
            <input value={email} readOnly className="w-full px-3 py-2 border rounded bg-gray-100" />
          </label>

          <label className="block mb-4">
            <div className="text-sm text-gray-600 mb-1">Phone</div>
            <input value={editing ? draft.phone : phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} readOnly={!editing} className={`w-full px-3 py-2 border rounded ${!editing ? 'bg-gray-100' : ''}`} />
          </label>

          <div className="flex justify-end">
            {editing ? (
              <button type="submit" disabled={saving} className="px-4 py-2 bg-indigo-600 text-white rounded">
                {saving ? 'Saving...' : 'Save changes'}
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
