import 'express-session';

declare module 'express-session' {
  interface SessionData {
    cart?: Array<{
      product: import('./data/products').Product;
      quantity: number;
    }>;
  }
}