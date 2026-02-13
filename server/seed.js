import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const sampleProducts = [
  // MOBILES - Apple
  {
    name: 'iPhone 15 Pro Max',
    price: 149999,
    category: 'Mobiles',
    brand: 'Apple',
    description: 'Latest Apple flagship with A17 Pro chip, Pro camera system, and titanium design',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
  },
  {
    name: 'iPhone 15',
    price: 79999,
    category: 'Mobiles',
    brand: 'Apple',
    description: 'Powerful iPhone with A16 Bionic chip and advanced camera',
    image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=500&fit=crop',
  },
  // MOBILES - Samsung
  {
    name: 'Samsung Galaxy S24 Ultra',
    price: 129999,
    category: 'Mobiles',
    brand: 'Samsung',
    description: 'Premium Samsung flagship with AI processing and 200MP camera',
    image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=crop',
  },
  {
    name: 'Samsung Galaxy A54',
    price: 43999,
    category: 'Mobiles',
    brand: 'Samsung',
    description: 'Mid-range Samsung with excellent battery life and display',
    image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=crop',
  },
  // MOBILES - OnePlus
  {
    name: 'OnePlus 12',
    price: 64999,
    category: 'Mobiles',
    brand: 'OnePlus',
    description: 'Fast and smooth flagship killer with Snapdragon 8 Gen 3',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
  },
  // MOBILES - Xiaomi
  {
    name: 'Xiaomi 14',
    price: 54999,
    category: 'Mobiles',
    brand: 'Xiaomi',
    description: 'Affordable flagship with excellent performance and camera',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
  },

  // TABLETS - Apple
  {
    name: 'iPad Pro 12.9"',
    price: 124999,
    category: 'Tablets',
    brand: 'Apple',
    description: 'Premium iPad with M2 chip, ProMotion display, and Apple Pencil support',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
  },
  {
    name: 'iPad Air',
    price: 69999,
    category: 'Tablets',
    brand: 'Apple',
    description: 'Powerful mid-range iPad with M1 performance',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
  },
  // TABLETS - Samsung
  {
    name: 'Samsung Galaxy Tab S9 Ultra',
    price: 99999,
    category: 'Tablets',
    brand: 'Samsung',
    description: 'Large 14.6" display tablet with S Pen and flagship specs',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
  },
  // TABLETS - Lenovo
  {
    name: 'Lenovo Tab P12 Pro',
    price: 59999,
    category: 'Tablets',
    brand: 'Lenovo',
    description: 'Budget-friendly tablet with good performance and display',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
  },

  // EARBUDS - Apple
  {
    name: 'Apple AirPods Pro 2',
    price: 24999,
    category: 'Earbuds',
    brand: 'Apple',
    description: 'Premium wireless earbuds with active noise cancellation and spatial audio',
    image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=500&h=500&fit=crop',
  },
  {
    name: 'Apple AirPods Max',
    price: 54999,
    category: 'Earbuds',
    brand: 'Apple',
    description: 'High-end over-ear headphones with Spatial Audio and Adaptive Audio',
    image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=500&h=500&fit=crop',
  },
  // EARBUDS - Samsung
  {
    name: 'Samsung Galaxy Buds2 Pro',
    price: 12999,
    category: 'Earbuds',
    brand: 'Samsung',
    description: 'True wireless earbuds with ANC and IPX7 water resistance',
    image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=500&h=500&fit=crop',
  },
  // EARBUDS - Sony
  {
    name: 'Sony WF-1000XM5',
    price: 15999,
    category: 'Earbuds',
    brand: 'Sony',
    description: 'Industry-leading noise cancellation and exceptional sound quality',
    image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=500&h=500&fit=crop',
  },
  // EARBUDS - Boult
  {
    name: 'Boult Audio Z40',
    price: 2999,
    category: 'Earbuds',
    brand: 'Boat',
    description: 'Affordable true wireless earbuds with decent battery life',
    image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=500&h=500&fit=crop',
  },

  // HEADSETS - Sony
  {
    name: 'Sony WH-1000XM5 Headphones',
    price: 29999,
    category: 'Headsets',
    brand: 'Sony',
    description: 'Best-in-class noise-cancelling headphones with premium sound',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
  },
  // HEADSETS - JBL
  {
    name: 'JBL Tour One M2',
    price: 19999,
    category: 'Headsets',
    brand: 'JBL',
    description: 'Premium noise-cancelling headphones with adaptive sound',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
  },
  // HEADSETS - Beats
  {
    name: 'Beats Studio Pro',
    price: 34999,
    category: 'Headsets',
    brand: 'Beats',
    description: 'High-end headphones with Apple integration and active noise cancellation',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
  },
  // HEADSETS - Sennheiser
  {
    name: 'Sennheiser Momentum 4',
    price: 26999,
    category: 'Headsets',
    brand: 'Sennheiser',
    description: 'Wireless headphones with exceptional battery life and comfort',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
  },

  // ACCESSORIES - Anker
  {
    name: 'Anker PowerCore 20100W',
    price: 1999,
    category: 'Accessories',
    brand: 'Anker',
    description: 'Portable power bank with 20100mAh capacity and fast charging',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
  },
  {
    name: 'Anker Nano II 65W Charger',
    price: 2999,
    category: 'Accessories',
    brand: 'Anker',
    description: 'Compact fast charger compatible with all devices',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
  },
  // ACCESSORIES - Belkin
  {
    name: 'Belkin Car Vent Mount',
    price: 999,
    category: 'Accessories',
    brand: 'Belkin',
    description: 'Secure car phone mount for any smartphone',
    image: 'https://images.unsplash.com/photo-1606136073574-5ce88effdb0c?w=500&h=500&fit=crop',
  },
  {
    name: 'Belkin Screen Protector',
    price: 599,
    category: 'Accessories',
    brand: 'Belkin',
    description: 'Tempered glass screen protector with easy application',
    image: 'https://images.unsplash.com/photo-1606136073574-5ce88effdb0c?w=500&h=500&fit=crop',
  },
  // ACCESSORIES - Samsung
  {
    name: 'Samsung USB-C Cable',
    price: 799,
    category: 'Accessories',
    brand: 'Samsung',
    description: '1.5m durable USB-C charging and data cable',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
  },
  // ACCESSORIES - Spigen
  {
    name: 'Spigen Tempered Glass Protector',
    price: 499,
    category: 'Accessories',
    brand: 'Spigen',
    description: 'Ultra-clear screen protector with high transparency',
    image: 'https://images.unsplash.com/photo-1606136073574-5ce88effdb0c?w=500&h=500&fit=crop',
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`✓ Successfully inserted ${insertedProducts.length} sample products`);

    await mongoose.disconnect();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
