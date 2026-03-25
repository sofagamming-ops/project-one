import { Router, Request, Response } from 'express';
import { products, getProductById, getProductsByCategory, getCategories, searchProducts, Product } from '../data/products';

const router = Router();

// Get all products or filter by category/search
router.get('/products', (req: Request, res: Response) => {
  const category = req.query.category as string;
  const search = req.query.search as string;
  const sort = req.query.sort as string;
  
  let filteredProducts: Product[] = [...products];

  // Filter by category
  if (category) {
    filteredProducts = getProductsByCategory(category);
  }

  // Filter by search
  if (search) {
    filteredProducts = searchProducts(search);
  }

  // Sort products
  if (sort === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sort === 'name') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  const categories = getCategories();

  res.render('products', {
    products: filteredProducts,
    categories,
    currentCategory: category || '',
    currentSort: sort || '',
    searchQuery: search || '',
    cart: req.session?.cart || []
  });
});

// Get single product
router.get('/product/:id', (req: Request, res: Response) => {
  const productId = parseInt(req.params.id as string);
  const product = getProductById(productId);

  if (!product) {
    return res.status(404).render('error', {
      message: 'Product not found',
      error: {},
      cart: req.session?.cart || []
    });
  }

  // Get related products from same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  res.render('product-detail', {
    product,
    relatedProducts,
    cart: req.session?.cart || []
  });
});

// Add to cart
router.post('/cart/add', (req: Request, res: Response) => {
  const productId = parseInt(req.body.productId);
  const quantity = parseInt(req.body.quantity) || 1;
  const product = getProductById(productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Initialize cart in session if not exists
  if (!req.session.cart) {
    req.session.cart = [];
  }

  // Check if product already in cart
  const existingItem = req.session.cart.find((item: any) => item.product.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    req.session.cart.push({ product, quantity });
  }

  res.json({ 
    success: true, 
    cartCount: req.session.cart.reduce((total: number, item: any) => total + item.quantity, 0)
  });
});

export { router as productsRouter };