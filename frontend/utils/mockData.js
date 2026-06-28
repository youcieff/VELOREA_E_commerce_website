export const MOCK_CATEGORIES = [
  { 
    _id: 'cat1',
    name: 'Future Tech', 
    description: 'Cutting edge electronics and gadgets.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80'
  },
  { 
    _id: 'cat2',
    name: 'Luxury Living', 
    description: 'Premium home decor and essentials.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
  },
  { 
    _id: 'cat3',
    name: 'Elite Fashion', 
    description: 'Curated apparel for the modern standard.',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80'
  }
];

export const MOCK_PRODUCTS = [
  {
    _id: 'prod1',
    name: 'Obsidian X1 Drone',
    description: 'Stealth-grade carbon fiber drone with 8K thermal imaging and neural navigation.',
    price: 2499,
    category: { name: 'Future Tech' },
    images: ['https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80'],
    countInStock: 5,
    keywords: ['drone', 'camera', 'tech']
  },
  {
    _id: 'prod2',
    name: 'Platinum Chrono',
    description: 'Limited edition sapphire crystal timepiece with architectural dial and mechanical movement.',
    price: 1850,
    category: { name: 'Elite Fashion' },
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'],
    countInStock: 12,
    keywords: ['watch', 'chrono', 'timepiece']
  },
  {
    _id: 'prod3',
    name: 'Zenith Glass Lamp',
    description: 'Hand-blown glass lamp with reactive ambient glow technology and smart dimming.',
    price: 450,
    category: { name: 'Luxury Living' },
    images: ['https://images.unsplash.com/photo-1507473885765-e6ed657f997a?auto=format&fit=crop&w=800&q=80'],
    countInStock: 20,
    keywords: ['lamp', 'light', 'glass']
  },
  {
    _id: 'prod4',
    name: 'Aether Wireless Audio',
    description: 'High-fidelity audio system with vacuum tube amplification and minimalist aesthetic.',
    price: 1200,
    category: { name: 'Future Tech' },
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
    countInStock: 8,
    keywords: ['audio', 'speaker', 'music']
  },
  {
    _id: 'prod5',
    name: 'Stellar Minimalist Desk',
    description: 'One-piece solid walnut desk with integrated wireless charging and cable management.',
    price: 3200,
    category: { name: 'Luxury Living' },
    images: ['https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80'],
    countInStock: 3,
    keywords: ['furniture', 'desk', 'walnut']
  }
];
