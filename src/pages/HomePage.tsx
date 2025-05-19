
import { useEffect } from "react";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import CategorySection from "@/components/CategorySection";
import BrandCarousel from "@/components/BrandCarousel";
import { getPopularProducts } from "@/services/productService";

const HomePage = () => {
  const popularProducts = getPopularProducts();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSlider />
      
      <CategorySection />
      
      <section className="py-10">
        <div className="container">
          <h2 className="text-2xl font-bold text-nepx-dark mb-6">Trending Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      <BrandCarousel />
      
      <section className="py-10">
        <div className="container">
          <h2 className="text-2xl font-bold text-nepx-dark mb-6">Recent Drops</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularProducts.slice(4, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-10 bg-nepx-primary text-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Authenticity Guaranteed</h2>
              <p className="mb-6">
                Every item sold on NepX goes through our comprehensive authenticity verification process 
                before being sent to you, so you never have to worry about buying fakes.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-nepx-secondary rounded-full mr-2"></div>
                  <span>Expert authentication team</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-nepx-secondary rounded-full mr-2"></div>
                  <span>Rigorous inspection process</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-nepx-secondary rounded-full mr-2"></div>
                  <span>Verified authentic tag</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-nepx-secondary rounded-full mr-2"></div>
                  <span>Money-back guarantee</span>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Authentication Process" 
                className="rounded-lg max-w-full h-auto shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
