
import { Product } from "@/components/ProductCard";

// Mock product data
const products: Product[] = [
  {
    id: "1",
    name: "Air Jordan 1 Retro High OG Chicago",
    brand: "Nike",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    lowestAsk: 35000,
    lastSalePrice: 32500,
    retailPrice: 18000,
    category: "sneakers",
    isXpressShipping: true
  },
  {
    id: "2",
    name: "Adidas Yeezy Boost 350 V2 Zebra",
    brand: "Adidas",
    image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    lowestAsk: 28000,
    lastSalePrice: 27500,
    retailPrice: 22000,
    category: "sneakers"
  },
  {
    id: "3",
    name: "Nike Dunk Low Retro White Black Panda",
    brand: "Nike",
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    lowestAsk: 15000,
    lastSalePrice: 14200,
    retailPrice: 10000,
    category: "sneakers",
    isXpressShipping: true
  },
  {
    id: "4",
    name: "Supreme Box Logo Hoodie FW20 Natural",
    brand: "Supreme",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    lowestAsk: 45000,
    lastSalePrice: 48000,
    retailPrice: 25000,
    category: "apparel"
  },
  {
    id: "5",
    name: "Bape 1st Camo Shark Full Zip Hoodie Green",
    brand: "Bape",
    image: "https://images.unsplash.com/photo-1536593998369-f0d25ed0fb1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    lowestAsk: 32000,
    retailPrice: 28000,
    category: "apparel"
  },
  {
    id: "6",
    name: "PlayStation 5 Digital Edition",
    brand: "Sony",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    lowestAsk: 65000,
    lastSalePrice: 60000,
    retailPrice: 55000,
    category: "electronics",
    isXpressShipping: true
  },
  {
    id: "7",
    name: "Kaws Companion Open Edition Grey",
    brand: "Kaws",
    image: "https://images.unsplash.com/photo-1581325649883-a12303166d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    lowestAsk: 18000,
    lastSalePrice: 17500,
    retailPrice: 15000,
    category: "collectibles"
  },
  {
    id: "8",
    name: "Pokémon TCG Charizard Holo 1st Edition",
    brand: "Pokémon",
    image: "https://images.unsplash.com/photo-1605979257913-1704eb7b6246?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    lowestAsk: 120000,
    lastSalePrice: 115000,
    retailPrice: 100,
    category: "trading-cards"
  }
];

export const getPopularProducts = (): Product[] => {
  return products;
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    product => 
      product.name.toLowerCase().includes(lowercaseQuery) || 
      product.brand.toLowerCase().includes(lowercaseQuery)
  );
};
