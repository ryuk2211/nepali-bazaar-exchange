
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1551489186-cf8726f514f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    title: "The Latest Sneakers",
    description: "Shop the hottest drops from Nike, Adidas, and Jordan",
    ctaText: "Shop Now",
    ctaLink: "/category/sneakers",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    title: "Streetwear Collection",
    description: "Premium apparel from Supreme, BAPE, and Off-White",
    ctaText: "Explore Collection",
    ctaLink: "/category/apparel",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1588495752527-77d65c09a5bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    title: "Limited Edition Collectibles",
    description: "Rare collectibles and exclusive drops",
    ctaText: "View Collectibles",
    ctaLink: "/category/collectibles",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden h-[50vh] md:h-[70vh]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out 
                    ${index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white max-w-3xl px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
              <p className="text-lg md:text-xl mb-8">{slide.description}</p>
              <Button size="lg" className="bg-nepx-secondary hover:bg-nepx-secondary/90 text-white">
                {slide.ctaText}
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/40 p-2"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/40 p-2"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-4" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
