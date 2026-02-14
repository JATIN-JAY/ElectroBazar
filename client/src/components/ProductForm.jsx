import React, { useState, useRef } from 'react';
import axios from 'axios';
import api from '../api';

const ProductForm = ({ onProductCreated, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Mobiles',
    brand: '',
    description: '',
    imageUrl: '',
    featured: false,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Cloudinary configuration from environment variables
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // Brand options for each category
  const brandsByCategory = {
    Mobiles: ['Apple', 'Samsung', 'Google Pixel', 'OnePlus', 'Xiaomi', 'iQOO', 'Motorola'],
    Tablets: ['Apple', 'Samsung', 'OnePlus', 'Lenovo', 'iPad', 'Huawei'],
    Audio: ['Apple', 'Samsung', 'Sony', 'JBL', 'Boat', 'Beats', 'Sennheiser'],
    'Phone Case': ['Spigen', 'OtterBox', 'Anker', 'Belkin', 'Samsung'],
    Accessories: ['Anker', 'Belkin', 'Samsung', 'Spigen', 'OtterBox'],
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('file', file);
      formDataToSend.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      // Upload to Cloudinary using unsigned upload
      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const imageUrl = uploadResponse.data.secure_url;
      setFormData((prev) => ({
        ...prev,
        imageUrl,
      }));
      setImagePreview(imageUrl);
      setSuccess('Image uploaded successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to upload image. Make sure Cloudinary is configured correctly.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate form
    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.brand ||
      !formData.description ||
      !formData.imageUrl
    ) {
      setError('Please fill in all fields and upload an image');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        '/products',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess('Product created successfully!');
      setFormData({
        name: '',
        price: '',
        category: 'Mobiles',
        brand: '',
        description: '',
        imageUrl: '',
        featured: false,
      });
      setImagePreview(null);

      if (onProductCreated) {
        onProductCreated(response.data.product);
      }

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to create product. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded text-green-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., iPhone 15 Pro Max"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (₹) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 149999"
            min="0"
            step="0.01"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand *
          </label>
          <select
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Brand</option>
            {brandsByCategory[formData.category]?.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter product description..."
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image *
          </label>
          <div className="flex items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >
              {uploading ? 'Uploading...' : 'Choose Image'}
            </button>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg"
              />
            )}
          </div>
        </div>

        {/* Featured Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleInputChange}
            className="w-4 h-4 cursor-pointer"
          />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700 cursor-pointer">
            Mark as featured product (will appear in hero gallery)
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 transition-all duration-300"
        >
          {loading ? 'Creating Product...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
