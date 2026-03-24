// Sport V - Products Data
// This file contains all product data for the static site

const products = [
  // Gloves Products
  {
    id: 1,
    name: 'Boxing Gloves',
    category: 'Gloves',
    price: 89.99,
    description: 'Professional boxing gloves designed for training and competition. Premium leather with extra padding for maximum protection.',
    image: 'https://b.top4top.io/p_3734aes0o1.png',
    inStock: true,
    rating: 4.9
  },
  {
    id: 2,
    name: 'Sparring Gloves',
    category: 'Gloves',
    price: 59.99,
    description: 'High-quality sparring gloves perfect for practice fights. Breathable design with comfortable fit.',
    image: 'https://c.top4top.io/p_37345ntp01.png',
    inStock: true,
    rating: 4.7
  },
  {
    id: 3,
    name: 'Hand Wraps',
    category: 'Gloves',
    price: 14.99,
    description: 'Professional hand wraps for boxing and martial arts. Provides excellent wrist support and hand protection.',
    image: 'https://k.top4top.io/p_3734tqw9t1.png',
    inStock: true,
    rating: 4.8
  },

  // Shin Guards Products
  {
    id: 4,
    name: 'RDX',
    category: 'Shin Guards',
    price: 49.99,
    description: 'Professional shin guards with impact-resistant foam padding. Comfortable fit for combat sports.',
    image: 'https://b.top4top.io/p_3734qzwo61.png',
    inStock: true,
    rating: 4.8
  },
  {
    id: 5,
    name: 'Venum',
    category: 'Shin Guards',
    price: 39.99,
    description: 'High-quality shin guards from Venum. Durable construction with excellent protection.',
    image: 'https://e.top4top.io/p_3734gb9y91.png',
    inStock: true,
    rating: 4.7
  },
  {
    id: 6,
    name: 'Twins',
    category: 'Shin Guards',
    price: 44.99,
    description: 'Twins Special shin guards for martial arts. Traditional design with modern protection.',
    image: 'https://l.top4top.io/p_3734u78zl1.png',
    inStock: true,
    rating: 4.6
  },

  // Mouth Guards Products
  {
    id: 7,
    name: 'Everlast',
    category: 'Mouth Guards',
    price: 19.99,
    description: 'Professional mouth guard from Everlast. Custom fit with comfortable design.',
    image: 'https://l.top4top.io/p_3734zy14o1.png',
    inStock: true,
    rating: 4.7
  },
  {
    id: 8,
    name: 'Venum',
    category: 'Mouth Guards',
    price: 24.99,
    description: 'High-quality mouth guard from Venum. Perfect for boxing and martial arts.',
    image: 'https://g.top4top.io/p_3734019a21.png',
    inStock: true,
    rating: 4.8
  },
  {
    id: 9,
    name: 'Badboy',
    category: 'Mouth Guards',
    price: 29.99,
    description: 'Badboy mouth guards for combat sports. Durable and protective.',
    image: 'https://k.top4top.io/p_3734qj1jv1.png',
    inStock: true,
    rating: 4.6
  },

  // Groin Guards Products
  {
    id: 10,
    name: 'RDX Guard',
    category: 'Groin Guards',
    price: 34.99,
    description: 'Professional groin guard from RDX. Heavy-duty protection for combat sports.',
    image: 'https://d.top4top.io/p_373487fp21.png',
    inStock: true,
    rating: 4.8
  },
  {
    id: 11,
    name: 'Venum Guard',
    category: 'Groin Guards',
    price: 29.99,
    description: 'High-quality groin protector from Venum. Comfortable and protective.',
    image: 'https://l.top4top.io/p_37343fdoz1.png',
    inStock: true,
    rating: 4.7
  },
  {
    id: 12,
    name: 'Everlast Guard',
    category: 'Groin Guards',
    price: 24.99,
    description: 'Everlast groin guard for boxing and martial arts. Reliable protection.',
    image: 'https://e.top4top.io/p_3734jxnj01.png',
    inStock: true,
    rating: 4.6
  },

  // Shorts Products
  {
    id: 13,
    name: 'Volk short',
    category: 'Shorts',
    price: 39.99,
    description: 'Professional fighting shorts from Volk. High-quality MMA shorts for competition.',
    image: 'https://h.top4top.io/p_37340qob91.png',
    inStock: true,
    rating: 4.8
  },
  {
    id: 14,
    name: 'Jones short',
    category: 'Shorts',
    price: 44.99,
    description: 'Jones fighting shorts for MMA and boxing. Durable and comfortable.',
    image: 'https://j.top4top.io/p_3734mnwyc1.png',
    inStock: true,
    rating: 4.7
  },
  {
    id: 15,
    name: 'Islam short',
    category: 'Shorts',
    price: 49.99,
    description: 'Islam MMA shorts for professional fighters. Premium quality and design.',
    image: 'https://b.top4top.io/p_3734nihky1.png',
    inStock: true,
    rating: 4.9
  }
];

// Get product by ID
function getProductById(id) {
  return products.find(p => p.id === parseInt(id));
}

// Get products by category
function getProductsByCategory(category) {
  if (!category) return products;
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

// Get all categories
function getCategories() {
  return [...new Set(products.map(p => p.category))];
}

// Search products
function searchProducts(query) {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  );
}

// Sort products
function sortProducts(productsArray, sortBy) {
  const sorted = [...productsArray];
  switch(sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}
