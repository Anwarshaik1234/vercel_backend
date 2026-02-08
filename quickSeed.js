import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Item from './models/Item.js';

dotenv.config();

// Quick test items (just 5 items for quick testing)
const quickTestItems = [
  {
    name: 'Wireless Headphones',
    description: 'Premium noise-canceling wireless headphones with great sound quality',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format',
    category: 'electronics',
    stock: 50
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracking smartwatch with heart rate monitor',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format',
    category: 'electronics',
    stock: 75
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes with excellent cushioning',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format',
    category: 'sports',
    stock: 80
  },
  {
    name: 'Coffee Maker',
    description: 'Classic French press coffee maker for rich coffee',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&auto=format',
    category: 'home',
    stock: 75
  },
  {
    name: 'Laptop Backpack',
    description: 'Water-resistant backpack with USB charging port',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format',
    category: 'fashion',
    stock: 100
  }
];

async function quickSeed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Item.deleteMany({});
    console.log('🗑️  Cleared existing items');

    const items = await Item.insertMany(quickTestItems);
    console.log(`✅ Added ${items.length} test items`);
    
    items.forEach((item, i) => {
      console.log(`${i + 1}. ${item.name} - $${item.price}`);
    });

    console.log('\n✨ Quick seed completed!');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

quickSeed();
