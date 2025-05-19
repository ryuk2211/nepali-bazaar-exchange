
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  lowestAsk: number;
  lastSalePrice?: number;
  retailPrice: number;
  category: string;
  isXpressShipping?: boolean;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ne-NP').format(price);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className={cn(
        "product-card bg-white rounded-lg overflow-hidden border h-full",
        className
      )}>
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full aspect-square object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 rounded-full"
            onClick={toggleFavorite}
          >
            <Heart 
              className={cn("h-5 w-5", isFavorited ? "fill-nepx-accent text-nepx-accent" : "text-gray-500")} 
            />
          </Button>
          {product.isXpressShipping && (
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-nepx-accent text-white">Xpress Ship</Badge>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <p className="text-sm text-gray-500 uppercase tracking-wider">{product.brand}</p>
          <h3 className="font-medium text-nepx-dark line-clamp-2 h-12">{product.name}</h3>
          
          <div className="mt-2 space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Lowest Ask</span>
              <span className="font-semibold npr-currency">{formatPrice(product.lowestAsk)}</span>
            </div>
            
            {product.lastSalePrice && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Last Sale</span>
                <span className="text-sm npr-currency">{formatPrice(product.lastSalePrice)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
