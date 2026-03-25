// Sport V - Main JavaScript (Static Site Version)
// Uses localStorage for cart functionality

// Cart storage key
const CART_STORAGE_KEY = 'sportv_cart';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize cart count on page load
  updateCartCount();

  // Add to cart functionality - using event delegation
  initAddToCart();

  // Toast notifications
  initToastNotifications();
});

// Get cart from localStorage
function getCart() {
  const cartJson = localStorage.getItem(CART_STORAGE_KEY);
  return cartJson ? JSON.parse(cartJson) : [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

// Update cart count in header
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const cartCountElements = document.querySelectorAll('.cart-count');
  cartCountElements.forEach(el => {
    el.textContent = count;
  });
}

// Initialize add to cart buttons - using event delegation
function initAddToCart() {
  // Use event delegation on the document body
  document.body.addEventListener('click', function(e) {
    // Check if the clicked element or its parent is an add-to-cart button
    const button = e.target.closest('.add-to-cart, .add-to-cart-btn');
    
    if (button) {
      e.preventDefault();
      e.stopPropagation();
      
      const productId = button.getAttribute('data-product-id');
      
      if (!productId) {
        console.error('No product ID found on button');
        return;
      }
      
      const quantityInput = document.getElementById('quantity');
      const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
      
      addToCart(parseInt(productId), quantity);
    }
  });
}

// Add product to cart
function addToCart(productId, quantity = 1) {
  const product = getProductById(productId);
  
  if (!product) {
    console.error('Product not found:', productId);
    showToast('Product not found', 'error');
    return;
  }

  let cart = getCart();
  const existingItem = cart.find(item => item.product.id === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      product: product,
      quantity: quantity
    });
  }
  
  saveCart(cart);
  updateCartCount();
  showToast('Product added to cart!', 'success');
}

// Toast notifications
function initToastNotifications() {
  // Create toast container if it doesn't exist
  if (!document.querySelector('.toast-container')) {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
}

function showToast(message, type = 'info') {
  const container = document.querySelector('.toast-container');
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  // Show toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Hide and remove toast
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Add toast styles dynamically
const toastStyles = document.createElement('style');
toastStyles.textContent = `
  .toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .toast {
    background: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 10px;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    min-width: 250px;
  }
  
  .toast.show {
    transform: translateX(0);
  }
  
  .toast-success {
    border-left: 4px solid #28a745;
  }
  
  .toast-success i {
    color: #28a745;
  }
  
  .toast-error {
    border-left: 4px solid #dc3545;
  }
  
  .toast-error i {
    color: #dc3545;
  }
  
  .toast-info {
    border-left: 4px solid #17a2b8;
  }
  
  .toast-info i {
    color: #17a2b8;
  }
`;
document.head.appendChild(toastStyles);

// ========================================
// Payment Methods Functions
// ========================================

// Checkout - Show payment methods modal
window.checkout = function() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast('Your cart is empty', 'error');
    return;
  }
  
  // Create and show payment modal
  const modal = document.createElement('div');
  modal.className = 'payment-modal';
  modal.innerHTML = `
    <div class="payment-modal-content">
      <div class="payment-modal-header">
        <h2><i class="fas fa-credit-card"></i> Select Payment Method</h2>
        <button class="payment-modal-close" onclick="closePaymentModal()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="payment-modal-body">
        <div class="payment-methods">
          <div class="payment-method" onclick="selectPaymentMethod('credit-card')">
            <div class="payment-icon">
              <i class="fas fa-credit-card"></i>
            </div>
            <div class="payment-info">
              <h3>Credit / Debit Card</h3>
              <p>Pay securely with Visa, Mastercard, American Express</p>
            </div>
            <div class="payment-check">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
          
          <div class="payment-method" onclick="selectPaymentMethod('paypal')">
            <div class="payment-icon">
              <i class="fab fa-paypal"></i>
            </div>
            <div class="payment-info">
              <h3>PayPal</h3>
              <p>Fast and secure payment via PayPal</p>
            </div>
            <div class="payment-check">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
          
          <div class="payment-method" onclick="selectPaymentMethod('apple-pay')">
            <div class="payment-icon">
              <i class="fab fa-apple"></i>
            </div>
            <div class="payment-info">
              <h3>Apple Pay</h3>
              <p>Quick payment with Apple Pay</p>
            </div>
            <div class="payment-check">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
          
          <div class="payment-method" onclick="selectPaymentMethod('google-pay')">
            <div class="payment-icon">
              <i class="fab fa-google-pay"></i>
            </div>
            <div class="payment-info">
              <h3>Google Pay</h3>
              <p>Fast and easy payment with Google Pay</p>
            </div>
            <div class="payment-check">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
          
          <div class="payment-method" onclick="selectPaymentMethod('cash-on-delivery')">
            <div class="payment-icon">
              <i class="fas fa-money-bill-wave"></i>
            </div>
            <div class="payment-info">
              <h3>Cash on Delivery</h3>
              <p>Pay when you receive your order</p>
            </div>
            <div class="payment-check">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="payment-modal-footer">
        <div class="secure-payment-note">
          <i class="fas fa-lock"></i>
          <span>Your payment is secure and encrypted</span>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  // Add animation
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
};

// Close payment modal
window.closePaymentModal = function() {
  const modal = document.querySelector('.payment-modal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
};

// Select payment method and process checkout
window.selectPaymentMethod = function(method) {
  closePaymentModal();
  
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const tax = subtotal * 0.10;
  const total = subtotal + shipping + tax;
  
  // Process payment based on method
  processPayment(method, total);
};

// Process payment
window.processPayment = function(method, amount) {
  const methodNames = {
    'credit-card': 'Credit/Debit Card',
    'paypal': 'PayPal',
    'apple-pay': 'Apple Pay',
    'google-pay': 'Google Pay',
    'cash-on-delivery': 'Cash on Delivery'
  };
  
  showToast(`Processing payment via ${methodNames[method]}...`, 'info');
  
  // Simulate payment processing
  setTimeout(() => {
    // Clear cart and show success
    saveCart([]);
    updateCartCount();
    
    showToast(`Payment of ${amount.toFixed(2)} via ${methodNames[method]} successful!`, 'success');
  }, 2000);
};

// Show payment modal (for server-side rendered pages)
window.showPaymentModal = function() {
  const modal = document.getElementById('paymentModal');
  if (modal) {
    modal.classList.add('show');
  }
};

// Close payment modal (for server-side rendered pages)
window.closePaymentModal = function() {
  const modal = document.getElementById('paymentModal');
  if (modal) {
    modal.classList.remove('show');
  }
};

// Process checkout (for server-side rendered pages)
window.processCheckout = function(method) {
  closePaymentModal();
  
  // Get cart total from the page
  const totalElement = document.querySelector('.summary-total .summary-value');
  const totalText = totalElement ? totalElement.textContent.replace('
, '').trim() : '0';
  const total = parseFloat(totalText) || 0;
  
  processPayment(method, total);
};

// Update cart count display
window.updateCartCountDisplay = function() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const cartCountElements = document.querySelectorAll('.cart-count');
  cartCountElements.forEach(el => {
    el.textContent = count;
  });
};
