// Sport V - Main JavaScript (Static Site Version)
// Uses localStorage for cart functionality

// Cart storage key
const CART_STORAGE_KEY = 'sportv_cart';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize cart count on page load
  updateCartCount();

  // Add to cart functionality
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

// Initialize add to cart buttons
function initAddToCart() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart, .add-to-cart-btn');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const productId = parseInt(this.dataset.productId);
      const quantityInput = document.getElementById('quantity');
      const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
      
      addToCart(productId, quantity);
    });
  });
}

// Add product to cart
function addToCart(productId, quantity = 1) {
  const product = getProductById(productId);
  
  if (!product) {
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
