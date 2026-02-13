import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900">ShopHub</div>
                <p className="text-sm text-gray-500">Premium gadgets, thoughtful design.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM7 11a5 5 0 0110 0v1H7v-1z" />
              </svg>
              <span>Designed with care · Privacy first</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/products" className="hover:text-gray-900">All Products</Link></li>
              <li><a href="#" className="hover:text-gray-900">New Arrivals</a></li>
              <li><a href="#" className="hover:text-gray-900">Best Sellers</a></li>
              <li><a href="#" className="hover:text-gray-900">Gift Cards</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900">About Us</a></li>
              <li><a href="#" className="hover:text-gray-900">Press</a></li>
              <li><a href="#" className="hover:text-gray-900">Careers</a></li>
              <li><a href="#" className="hover:text-gray-900">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Stay updated</h4>
            <p className="text-sm text-gray-600 mb-4">Get occasional updates about new arrivals and offers.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Subscribe</button>
            </form>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M22 4.01c-.77.35-1.6.59-2.47.69a4.27 4.27 0 001.88-2.36c-.84.5-1.78.86-2.78 1.06A4.25 4.25 0 0015.5 3c-2.36 0-4.27 1.9-4.27 4.27 0 .33.04.66.11.97-3.55-.18-6.7-1.88-8.8-4.48-.37.63-.58 1.36-.58 2.14 0 1.48.75 2.78 1.9 3.55-.7-.02-1.36-.21-1.94-.53v.05c0 2.06 1.46 3.78 3.4 4.17-.36.1-.74.16-1.14.16-.28 0-.55-.03-.81-.08.55 1.7 2.17 2.94 4.08 2.97A8.53 8.53 0 012 19.54a12.07 12.07 0 006.53 1.91c7.84 0 12.13-6.5 12.13-12.13v-.55c.83-.6 1.55-1.35 2.12-2.21-.76.34-1.58.57-2.42.67z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c2.76 0 5 2.24 5 5v10c0 2.76-2.24 5-5 5s-5-2.24-5-5V7c0-2.76 2.24-5 5-5zm-1 5h2v10h-2V7z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5 7 13 7 13s7-8 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-100 text-sm text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} ShopHub, Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-700">Terms</a>
            <a href="#" className="hover:text-gray-700">Privacy</a>
            <a href="#" className="hover:text-gray-700">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
