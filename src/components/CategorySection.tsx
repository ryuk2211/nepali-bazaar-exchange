
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  image: string;
  path: string;
}

const categories: Category[] = [
  {
    id: "sneakers",
    name: "Sneakers",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    path: "/category/sneakers",
  },
  {
    id: "apparel",
    name: "Apparel",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    path: "/category/apparel",
  },
  {
    id: "collectibles",
    name: "Collectibles",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    path: "/category/collectibles",
  },
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    path: "/category/electronics",
  },
];

const CategorySection = () => {
  return (
    <section className="py-10">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-nepx-dark">Shop By Category</h2>
          <Link 
            to="/categories" 
            className="flex items-center text-nepx-secondary hover:underline"
          >
            View All
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={category.path}
              className="relative group overflow-hidden rounded-lg"
            >
              <div className="aspect-square">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <h3 className="text-white font-semibold p-4 text-lg">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
