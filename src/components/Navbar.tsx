
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const categories = [
    { name: "Sneakers", path: "/category/sneakers" },
    { name: "Apparel", path: "/category/apparel" },
    { name: "Collectibles", path: "/category/collectibles" },
    { name: "Electronics", path: "/category/electronics" },
    { name: "Trading Cards", path: "/category/trading-cards" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="md:hidden mr-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        <div className="mr-4 flex">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-nepx-primary">
              Nep<span className="text-nepx-secondary">X</span>
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {categories.map((category) => (
            <Link 
              key={category.name}
              to={category.path}
              className="transition-colors hover:text-nepx-secondary"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        <div className="flex-1 flex justify-end md:justify-center px-4">
          <div className="w-full max-w-sm items-center hidden md:flex">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products, brands..."
                className="w-full pl-8 rounded-xl bg-background"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" aria-label="Search" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
          </Button>
          {isLoggedIn ? (
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm">
                Log In
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 md:hidden bg-background shadow-md transition-all",
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <nav className="flex flex-col space-y-6 text-lg font-medium">
          {categories.map((category) => (
            <Link 
              key={category.name}
              to={category.path}
              className="transition-colors hover:text-nepx-secondary"
              onClick={() => setIsMenuOpen(false)}
            >
              {category.name}
            </Link>
          ))}
          <div className="py-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products, brands..."
                className="w-full pl-8 rounded-xl bg-background"
              />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
