
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Truck, ShieldCheck, ArrowRight, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProductById } from "@/services/productService";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isFavorited, setIsFavorited] = useState(false);
  const product = getProductById(id || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ne-NP').format(price);
  };

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-white rounded-lg overflow-hidden border">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="aspect-square bg-white rounded-lg overflow-hidden border cursor-pointer">
                <img 
                  src={product.image} 
                  alt={`${product.name} view ${index + 1}`} 
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h6 className="text-sm text-gray-500 uppercase tracking-wider mb-1">{product.brand}</h6>
              <h1 className="text-2xl md:text-3xl font-bold text-nepx-dark">{product.name}</h1>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => setIsFavorited(!isFavorited)}
            >
              <Heart 
                className={isFavorited ? "fill-nepx-accent text-nepx-accent" : "text-gray-500"} 
              />
            </Button>
          </div>

          {product.isXpressShipping && (
            <Badge className="mt-2 bg-nepx-accent text-white">Xpress Ship</Badge>
          )}

          <div className="mt-6 space-y-6">
            <div className="flex justify-between items-center py-3 border-y">
              <span className="font-medium">Retail Price</span>
              <span className="text-gray-500 npr-currency">{formatPrice(product.retailPrice)}</span>
            </div>

            <Tabs defaultValue="buy">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
              </TabsList>

              <TabsContent value="buy" className="space-y-4">
                <div className="p-4 bg-nepx-light rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Lowest Ask</p>
                      <p className="text-2xl font-bold npr-currency">{formatPrice(product.lowestAsk)}</p>
                    </div>
                    <Button className="bg-nepx-secondary hover:bg-nepx-secondary/90">
                      Buy Now
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border">
                  <p className="font-semibold mb-2">Place Bid</p>
                  <div className="flex items-center gap-4">
                    <input 
                      type="number" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter your bid amount"
                    />
                    <Button variant="outline" className="flex-shrink-0">
                      Place Bid
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sell" className="space-y-4">
                <div className="p-4 bg-nepx-light rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Highest Bid</p>
                      <p className="text-2xl font-bold npr-currency">
                        {formatPrice(product.lastSalePrice ? product.lastSalePrice - 1000 : product.lowestAsk - 2000)}
                      </p>
                    </div>
                    <Button className="bg-nepx-accent hover:bg-nepx-accent/90">
                      Sell Now
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border">
                  <p className="font-semibold mb-2">List For Sale</p>
                  <div className="flex items-center gap-4">
                    <input 
                      type="number" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter your asking price"
                    />
                    <Button variant="outline" className="flex-shrink-0">
                      List Item
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {product.lastSalePrice && (
              <div className="flex justify-between items-center py-3 border-y">
                <span className="font-medium">Last Sale</span>
                <span className="text-gray-500 npr-currency">{formatPrice(product.lastSalePrice)}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Button variant="link" className="p-0 flex items-center text-nepx-primary">
                <BarChart3 className="mr-1 h-4 w-4" />
                View Price Chart
              </Button>
              <Button variant="link" className="p-0 flex items-center text-nepx-primary">
                View All Asks <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg border">
                <Truck className="h-8 w-8 text-nepx-primary mb-2" />
                <h3 className="font-semibold">Fast Delivery</h3>
                <p className="text-sm text-gray-500">2-4 business days</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg border">
                <ShieldCheck className="h-8 w-8 text-nepx-primary mb-2" />
                <h3 className="font-semibold">Authenticity</h3>
                <p className="text-sm text-gray-500">Verified genuine</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg border">
                <Badge className="h-8 w-8 flex items-center justify-center bg-nepx-primary mb-2">रू</Badge>
                <h3 className="font-semibold">Secure Payments</h3>
                <p className="text-sm text-gray-500">Multiple options</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="authenticity">Authenticity</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="py-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">About the {product.name}</h3>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo. 
                Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus. 
                Sed malesuada viverra iaculis. Nullam a quis nisi vel nisl efficitur maximus. Sed lobortis 
                dolor sit amet lacus feugiat, sit amet placerat dui convallis.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Product Details</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li><span className="font-medium">Brand:</span> {product.brand}</li>
                    <li><span className="font-medium">Style:</span> AJ1-RH-CHI</li>
                    <li><span className="font-medium">Colorway:</span> Red/White/Black</li>
                    <li><span className="font-medium">Release Date:</span> 01/01/2023</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Size & Fit</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>True to size</li>
                    <li>Regular fit</li>
                    <li>Available in US men's sizing</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="py-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Shipping Information</h3>
              <p className="text-gray-700">
                All items are shipped from our authentication center after verification. 
                Standard delivery takes 2-4 business days within Nepal.
              </p>
              <div className="border rounded-lg p-4 bg-nepx-light">
                <h4 className="font-semibold mb-2">Shipping Options</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center p-2 border-b">
                    <div>
                      <p className="font-medium">Standard</p>
                      <p className="text-sm text-gray-500">2-4 business days</p>
                    </div>
                    <span className="npr-currency">400</span>
                  </li>
                  <li className="flex justify-between items-center p-2 border-b">
                    <div>
                      <p className="font-medium">Express</p>
                      <p className="text-sm text-gray-500">1-2 business days</p>
                    </div>
                    <span className="npr-currency">800</span>
                  </li>
                  <li className="flex justify-between items-center p-2">
                    <div>
                      <p className="font-medium">Same Day (Kathmandu only)</p>
                      <p className="text-sm text-gray-500">Within 24 hours</p>
                    </div>
                    <span className="npr-currency">1200</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="authenticity" className="py-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Authenticity Guarantee</h3>
              <p className="text-gray-700">
                NepX has developed rigorous authentication standards to ensure every item sold on our marketplace is 100% authentic.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Step 1: Expert Verification</h4>
                  <p className="text-sm text-gray-700">
                    Our team of authenticators with years of experience examine every detail of your item.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Step 2: Authentication Tags</h4>
                  <p className="text-sm text-gray-700">
                    Once verified, items receive our unique NepX authentication tag that cannot be replicated.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Step 3: Secure Delivery</h4>
                  <p className="text-sm text-gray-700">
                    Your authenticated item is carefully packaged and delivered securely to your door.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
