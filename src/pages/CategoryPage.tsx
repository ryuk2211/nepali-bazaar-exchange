
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Filter, ArrowDownUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProductCard, { Product } from "@/components/ProductCard";
import { getProductsByCategory } from "@/services/productService";

const brands = [
  { id: "nike", label: "Nike" },
  { id: "adidas", label: "Adidas" },
  { id: "jordan", label: "Jordan" },
  { id: "puma", label: "Puma" },
  { id: "newbalance", label: "New Balance" },
  { id: "supreme", label: "Supreme" },
  { id: "bape", label: "Bape" },
];

const sortOptions = [
  { value: "trending", label: "Trending" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState("trending");
  const [xpressOnly, setXpressOnly] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (category) {
      const loadedProducts = getProductsByCategory(category);
      setProducts(loadedProducts);
      setFilteredProducts(loadedProducts);
    }
  }, [category]);

  useEffect(() => {
    let result = [...products];
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by brands
    if (selectedBrands.length > 0) {
      result = result.filter(product => 
        selectedBrands.includes(product.brand.toLowerCase())
      );
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.lowestAsk >= priceRange[0] && product.lowestAsk <= priceRange[1]
    );
    
    // Filter by xpress shipping
    if (xpressOnly) {
      result = result.filter(product => product.isXpressShipping);
    }
    
    // Sort products
    if (sortBy === "price-low") {
      result.sort((a, b) => a.lowestAsk - b.lowestAsk);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.lowestAsk - a.lowestAsk);
    } else if (sortBy === "newest") {
      // In a real app, this would sort by release date
      result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }
    
    setFilteredProducts(result);
  }, [products, searchQuery, selectedBrands, priceRange, sortBy, xpressOnly]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => {
      if (prev.includes(brand.toLowerCase())) {
        return prev.filter(b => b !== brand.toLowerCase());
      } else {
        return [...prev, brand.toLowerCase()];
      }
    });
  };

  const getCategoryTitle = () => {
    if (!category) return "All Products";
    
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">{getCategoryTitle()}</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 space-y-6">
          <div>
            <h3 className="font-medium text-lg mb-4">Filter By</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="searchFilter" className="text-sm font-medium">Search</Label>
                <div className="relative mt-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="searchFilter"
                    placeholder="Search in this category"
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Price Range</Label>
                <div className="pt-4 px-1">
                  <Slider
                    defaultValue={[0, 100000]}
                    max={100000}
                    step={1000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs npr-currency">{new Intl.NumberFormat('ne-NP').format(priceRange[0])}</span>
                  <span className="text-xs npr-currency">{new Intl.NumberFormat('ne-NP').format(priceRange[1])}</span>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Brand</Label>
                <div className="space-y-2 mt-2">
                  {brands.map((brand) => (
                    <div key={brand.id} className="flex items-center">
                      <Checkbox 
                        id={`brand-${brand.id}`} 
                        checked={selectedBrands.includes(brand.label.toLowerCase())}
                        onCheckedChange={() => handleBrandChange(brand.label)}
                      />
                      <label 
                        htmlFor={`brand-${brand.id}`}
                        className="ml-2 text-sm font-medium cursor-pointer"
                      >
                        {brand.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="xpress-shipping" 
                    checked={xpressOnly}
                    onCheckedChange={(checked) => setXpressOnly(checked as boolean)}
                  />
                  <label 
                    htmlFor="xpress-shipping"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Xpress Shipping Only
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setSearchQuery("");
                setSelectedBrands([]);
                setPriceRange([0, 100000]);
                setXpressOnly(false);
                setSortBy("trending");
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
            <div className="flex items-center">
              <p className="text-sm text-gray-500">
                {filteredProducts.length} results
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden gap-1">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Narrow down your product search
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="py-4 space-y-6">
                    <div>
                      <Label htmlFor="mobileSearchFilter" className="text-sm font-medium">Search</Label>
                      <div className="relative mt-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="mobileSearchFilter"
                          placeholder="Search in this category"
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Price Range</Label>
                      <div className="pt-4 px-1">
                        <Slider
                          defaultValue={[0, 100000]}
                          max={100000}
                          step={1000}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs npr-currency">{new Intl.NumberFormat('ne-NP').format(priceRange[0])}</span>
                        <span className="text-xs npr-currency">{new Intl.NumberFormat('ne-NP').format(priceRange[1])}</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Brand</Label>
                      <div className="space-y-2 mt-2">
                        {brands.map((brand) => (
                          <div key={brand.id} className="flex items-center">
                            <Checkbox 
                              id={`mobile-brand-${brand.id}`} 
                              checked={selectedBrands.includes(brand.label.toLowerCase())}
                              onCheckedChange={() => handleBrandChange(brand.label)}
                            />
                            <label 
                              htmlFor={`mobile-brand-${brand.id}`}
                              className="ml-2 text-sm font-medium cursor-pointer"
                            >
                              {brand.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="mobile-xpress-shipping" 
                          checked={xpressOnly}
                          onCheckedChange={(checked) => setXpressOnly(checked as boolean)}
                        />
                        <label 
                          htmlFor="mobile-xpress-shipping"
                          className="text-sm font-medium cursor-pointer"
                        >
                          Xpress Shipping Only
                        </label>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedBrands([]);
                        setPriceRange([0, 100000]);
                        setXpressOnly(false);
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
              
              {/* Sort Dropdown */}
              <div className="flex items-center gap-1">
                <ArrowDownUp className="h-4 w-4" />
                <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
                  <SelectTrigger className="w-[140px] sm:w-[180px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg font-medium">No products found</p>
              <p className="text-gray-500 mt-2">Try adjusting your filters</p>
            </div>
          )}
          
          {/* Pagination placeholder */}
          <div className="mt-8 flex justify-center">
            <Button variant="outline" disabled>Load More</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
