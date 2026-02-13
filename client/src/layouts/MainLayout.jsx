import React from 'react';
import Footer from '../components/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Add padding-top to account for fixed navbar */}
      <main className="flex-1 pt-16">
        {children}
      </main>

      <Footer />
    </div>
  );
}
