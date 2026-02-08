import express from 'express';
import Item from '../models/Item.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all items (public)
router.get('/', async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    
    let query = {};
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Sort options
    let sortOptions = {};
    if (sort === 'price-asc') {
      sortOptions.price = 1;
    } else if (sort === 'price-desc') {
      sortOptions.price = -1;
    } else if (sort === 'newest') {
      sortOptions.createdAt = -1;
    } else {
      sortOptions.createdAt = -1; // default
    }
    
    const items = await Item.find(query).sort(sortOptions);
    
    res.status(200).json({ items });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Error fetching items' });
  }
});

// Get single item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.status(200).json({ item });
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ message: 'Error fetching item' });
  }
});

// Create item (protected - for admin use)
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, price, image, category, stock } = req.body;
    
    const item = new Item({
      name,
      description,
      price,
      image,
      category,
      stock: stock || 100
    });
    
    await item.save();
    
    res.status(201).json({ 
      message: 'Item created successfully',
      item 
    });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ message: 'Error creating item' });
  }
});

// Seed initial items (for development)
router.post('/seed', async (req, res) => {
  try {
    const sampleItems = [
      {
        name: 'Wireless Headphones',
        description: 'Premium noise-canceling wireless headphones with 30-hour battery life',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        category: 'electronics',
        stock: 50
      },
      {
        name: 'Smart Watch',
        description: 'Fitness tracking smartwatch with heart rate monitor and GPS',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        category: 'electronics',
        stock: 75
      },
      {
        name: 'Designer Backpack',
        description: 'Stylish and functional laptop backpack with multiple compartments',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
        category: 'fashion',
        stock: 100
      },
      {
        name: 'Coffee Maker',
        description: 'Programmable coffee maker with thermal carafe and auto-brew feature',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
        category: 'home',
        stock: 60
      },
      {
        name: 'Yoga Mat',
        description: 'Extra thick non-slip yoga mat with carrying strap',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500',
        category: 'sports',
        stock: 120
      },
      {
        name: 'Bestseller Novel',
        description: 'Latest fiction bestseller - thrilling mystery novel',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        category: 'books',
        stock: 200
      },
      {
        name: 'Skincare Set',
        description: 'Complete skincare routine set with cleanser, toner, and moisturizer',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500',
        category: 'beauty',
        stock: 80
      },
      {
        name: 'Bluetooth Speaker',
        description: 'Portable waterproof Bluetooth speaker with 360° sound',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
        category: 'electronics',
        stock: 90
      }
    ];
    
    await Item.deleteMany({}); // Clear existing items
    await Item.insertMany(sampleItems);
    
    res.status(201).json({ 
      message: 'Sample items created successfully',
      count: sampleItems.length
    });
  } catch (error) {
    console.error('Error seeding items:', error);
    res.status(500).json({ message: 'Error seeding items' });
  }
});

export default router;
