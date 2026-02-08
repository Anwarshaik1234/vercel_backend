import express from 'express';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Item from '../models/Item.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get user's orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.item')
      .sort({ createdAt: -1 });
    
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    }).populate('items.item');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json({ order });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order' });
  }
});

// Create order from cart (checkout)
router.post('/', auth, async (req, res) => {
  try {
    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.item');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    
    // Verify stock and prepare order items
    const orderItems = [];
    let totalAmount = 0;
    
    for (const cartItem of cart.items) {
      const item = await Item.findById(cartItem.item._id);
      
      if (!item) {
        return res.status(404).json({ 
          message: `Item ${cartItem.item.name} not found` 
        });
      }
      
      if (item.stock < cartItem.quantity) {
        return res.status(400).json({ 
          message: `Not enough stock for ${item.name}` 
        });
      }
      
      // Reduce stock
      item.stock -= cartItem.quantity;
      await item.save();
      
      // Add to order items
      orderItems.push({
        item: item._id,
        quantity: cartItem.quantity,
        price: item.price
      });
      
      totalAmount += item.price * cartItem.quantity;
    }
    
    // Create order
    const order = new Order({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      status: 'pending'
    });
    
    await order.save();
    await order.populate('items.item');
    
    // Clear cart
    cart.items = [];
    await cart.save();
    
    res.status(201).json({ 
      message: 'Order placed successfully',
      order 
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Update order status (for admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { status },
      { new: true }
    ).populate('items.item');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json({ 
      message: 'Order status updated',
      order 
    });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Error updating order' });
  }
});

export default router;
