import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Item from './models/Item.js';

// Load environment variables
dotenv.config();

// Sample items to populate the database
const sampleItems = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life and superior sound quality. Perfect for music lovers and professionals.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format',
    category: 'electronics',
    stock: 50
  },
  {
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking smartwatch with heart rate monitor, GPS, and water resistance. Track your health 24/7.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format',
    category: 'electronics',
    stock: 75
  },
  {
    name: 'Laptop Backpack',
    description: 'Water-resistant laptop backpack with USB charging port and multiple compartments. Fits up to 15.6" laptops.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format',
    category: 'fashion',
    stock: 100
  },
  {
    name: 'Portable Power Bank 20000mAh',
    description: 'High-capacity power bank with fast charging capability. Charge multiple devices simultaneously.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c0?w=500&auto=format',
    category: 'electronics',
    stock: 120
  },
  {
    name: 'Wireless Gaming Mouse',
    description: 'High-precision wireless gaming mouse with RGB lighting and programmable buttons. 16000 DPI sensor.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format',
    category: 'electronics',
    stock: 60
  },
  {
    name: 'Mechanical Keyboard RGB',
    description: 'Premium mechanical keyboard with customizable RGB backlighting and blue switches. Perfect for gaming and typing.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format',
    category: 'electronics',
    stock: 45
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes with excellent cushioning and breathable mesh. Perfect for marathons and daily runs.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format',
    category: 'sports',
    stock: 80
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Extra thick non-slip yoga mat with carrying strap. Eco-friendly and durable for all types of exercises.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&auto=format',
    category: 'sports',
    stock: 90
  },
  {
    name: 'LED Desk Lamp',
    description: 'Modern LED desk lamp with adjustable brightness and color temperature. USB charging port included.',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format',
    category: 'home',
    stock: 70
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. 32oz capacity, BPA-free.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format',
    category: 'sports',
    stock: 150
  },
  {
    name: 'Cotton T-Shirt Pack (3-Pack)',
    description: 'Premium quality cotton t-shirts in classic colors. Soft, breathable, and perfect for everyday wear.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format',
    category: 'fashion',
    stock: 200
  },
  {
    name: 'Sunglasses Polarized',
    description: 'Stylish polarized sunglasses with UV400 protection. Lightweight frame with premium lenses.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format',
    category: 'fashion',
    stock: 85
  },
  {
    name: 'The Art of Programming',
    description: 'Comprehensive guide to modern programming practices. Perfect for beginners and intermediate developers.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&auto=format',
    category: 'books',
    stock: 40
  },
  {
    name: 'Cookbook: Healthy Meals',
    description: '100+ delicious and healthy recipes for everyday cooking. Includes nutritional information and meal prep tips.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format',
    category: 'books',
    stock: 55
  },
  {
    name: 'Skincare Set Premium',
    description: 'Complete skincare routine set with cleanser, toner, serum, and moisturizer. Suitable for all skin types.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&auto=format',
    category: 'beauty',
    stock: 65
  },
  {
    name: 'Essential Oil Diffuser',
    description: 'Ultrasonic aromatherapy diffuser with LED lights. Create a relaxing atmosphere in any room.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format',
    category: 'home',
    stock: 95
  },
  {
    name: 'Coffee Maker French Press',
    description: 'Classic French press coffee maker. Makes 8 cups of rich, flavorful coffee. Dishwasher safe.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&auto=format',
    category: 'home',
    stock: 75
  },
  {
    name: 'Bluetooth Speaker Portable',
    description: 'Waterproof portable speaker with 360° sound and 20-hour battery life. Perfect for outdoor adventures.',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format',
    category: 'electronics',
    stock: 88
  },
  {
    name: 'Resistance Bands Set',
    description: 'Complete set of 5 resistance bands with different resistance levels. Includes door anchor and handles.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&auto=format',
    category: 'sports',
    stock: 110
  },
  {
    name: 'Aromatherapy Candle Set',
    description: 'Set of 6 scented candles made from natural soy wax. Long-lasting burn time and calming fragrances.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1602874801006-94c35a5c4e6e?w=500&auto=format',
    category: 'home',
    stock: 125
  }
];

// Function to seed the database
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing items (optional - remove if you want to keep existing items)
    await Item.deleteMany({});
    console.log('🗑️  Cleared existing items');

    // Insert sample items
    const insertedItems = await Item.insertMany(sampleItems);
    console.log(`✅ Successfully inserted ${insertedItems.length} items into the database`);

    // Display inserted items
    console.log('\n📦 Items added:');
    insertedItems.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - $${item.price} (${item.category})`);
    });

    console.log('\n✨ Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log('👋 Database connection closed');
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();
