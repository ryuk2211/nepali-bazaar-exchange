
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Brand {
  id: string;
  name: string;
  logo: string;
}

const brands: Brand[] = [
  { id: "nike", name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
  { id: "adidas", name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
  { id: "jordan", name: "Jordan", logo: "https://upload.wikimedia.org/wikipedia/en/3/37/Jumpman_logo.svg" },
  { id: "newbalance", name: "New Balance", logo: "https://upload.wikimedia.org/wikipedia/commons/e/ea/New_Balance_logo.svg" },
  { id: "puma", name: "Puma", logo: "https://upload.wikimedia.org/wikipedia/commons/8/88/Puma_logo.svg" },
  { id: "reebok", name: "Reebok", logo: "https://upload.wikimedia.org/wikipedia/commons/0/02/Reebok_logo.svg" },
  { id: "converse", name: "Converse", logo: "https://upload.wikimedia.org/wikipedia/commons/3/30/Converse_logo.svg" },
  { id: "vans", name: "Vans", logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Vans-logo.svg" },
];

const BrandCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons();
      
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollButtons);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 bg-gray-50">
      <div className="container">
        <h2 className="text-2xl font-bold text-nepx-dark mb-6">Popular Brands</h2>
        
        <div className="relative">
          {canScrollLeft && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 py-4 px-1 scrollbar-none"
          >
            {brands.map((brand) => (
              <div 
                key={brand.id}
                className="min-w-[150px] aspect-[3/2] bg-white rounded-lg border flex items-center justify-center p-4 transition-all hover:shadow-md cursor-pointer"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-h-12 max-w-full"
                />
              </div>
            ))}
          </div>
          
          {canScrollRight && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
