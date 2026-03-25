import { Router, Request, Response } from 'express';
import { getProductById } from '../data/products';

const router = Router();

// Get cart count
router.get('/count', (req: Request, res: Response) => {
  const cart = req.session?.cart || [];
  const cartCount = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
  res.json({ cartCount });
});

// Get cart page
router.get('/', (req: Request, res: Response) => {
  const cart = req.session?.cart || [];
  const total = cart.reduce((sum: number, item: any) => sum + (item.product.price * item.quantity), 0);
  
  res.render('cart', {
    cart,
    total,
    cartCount: cart.reduce((sum: number, item: any) => sum + item.quantity, 0)
  });
});

// Update cart quantity
router.post('/update', (req: Request, res: Response) => {
  const productId = parseInt(req.body.productId);
  const quantity = parseInt(req.body.quantity);

  if (!req.session.cart) {
    return res.json({ error: 'Cart is empty' });
  }

  const itemIndex = req.session.cart.findIndex((item: any) => item.product.id === productId);

  if (itemIndex === -1) {
    return res.json({ error: 'Product not found in cart' });
  }

  if (quantity <= 0) {
    req.session.cart.splice(itemIndex, 1);
  } else {
    req.session.cart[itemIndex].quantity = quantity;
  }

  const cartCount = req.session.cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
  const total = req.session.cart.reduce((sum: number, item: any) => sum + (item.product.price * item.quantity), 0);

  res.json({ 
    success: true, 
    cartCount,
    total: total.toFixed(2)
  });
});

// Remove item from cart
router.post('/remove', (req: Request, res: Response) => {
  const productId = parseInt(req.body.productId);

  if (!req.session.cart) {
    return res.json({ error: 'Cart is empty' });
  }

  req.session.cart = req.session.cart.filter((item: any) => item.product.id !== productId);

  const cartCount = req.session.cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
  const total = req.session.cart.reduce((sum: number, item: any) => sum + (item.product.price * item.quantity), 0);

  res.json({ 
    success: true, 
    cartCount,
    total: total.toFixed(2)
  });
});

// Clear cart
router.post('/clear', (req: Request, res: Response) => {
  req.session.cart = [];
  
  res.json({ 
    success: true, 
    cartCount: 0,
    total: '0.00'
  });
});

export { router as cartRouter };