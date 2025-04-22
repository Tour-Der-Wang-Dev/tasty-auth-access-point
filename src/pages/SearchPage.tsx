
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Filter, ArrowDown, ArrowUp, CheckCircle } from "lucide-react";
import { restaurants, categories } from "../data/mockData";
import SearchBar from "../components/SearchBar";
import RestaurantCard from "../components/RestaurantCard";
import BottomNavigation from "../components/BottomNavigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([1, 4]);
  const [sortBy, setSortBy] = useState('recommended');
  
  // Filter restaurants based on query
  const filteredRestaurants = restaurants.filter(restaurant => {
    if (query && !restaurant.name.toLowerCase().includes(query.toLowerCase()) &&
        !restaurant.cuisine.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }
    
    if (selectedCuisines.length > 0 && 
        !selectedCuisines.some(cuisine => restaurant.cuisine.includes(cuisine))) {
      return false;
    }
    
    return true;
  });
  
  // Sort restaurants
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'delivery-time':
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      case 'price-low':
        return parseFloat(a.deliveryFee.replace('$', '')) - 
               parseFloat(b.deliveryFee.replace('$', ''));
      case 'price-high':
        return parseFloat(b.deliveryFee.replace('$', '')) - 
               parseFloat(a.deliveryFee.replace('$', ''));
      default:
        return 0;
    }
  });
  
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    navigate(`/search?q=${searchQuery}`);
  };
  
  const handleCuisineToggle = (cuisine: string) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };
  
  const clearFilters = () => {
    setSelectedCuisines([]);
    setPriceRange([1, 4]);
    setSortBy('recommended');
    setOpenFilter(false);
    
    toast({
      title: "Filters cleared",
      description: "All filters have been reset to default.",
    });
  };
  
  const applyFilters = () => {
    setOpenFilter(false);
    
    toast({
      title: "Filters applied",
      description: `${sortedRestaurants.length} restaurants match your criteria.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 sticky top-0 z-10 shadow-sm">
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Search for restaurants or cuisines..."
          location="Current Location"
        />
        
        <div className="flex justify-between mt-4">
          <Sheet open={openFilter} onOpenChange={setOpenFilter}>
            <SheetTrigger asChild>
              <button className="flex items-center text-sm font-medium px-3 py-1.5 bg-gray-100 rounded-full">
                <Filter className="w-4 h-4 mr-1" />
                Filters
              </button>
            </SheetTrigger>
            
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              
              <div className="mt-6">
                <h3 className="font-medium mb-3">Cuisines</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['Italian', 'American', 'Mexican', 'Chinese', 'Japanese', 'Indian', 'Thai'].map(cuisine => (
                    <label 
                      key={cuisine}
                      className={`flex items-center p-2 border rounded-lg cursor-pointer ${
                        selectedCuisines.includes(cuisine) 
                          ? 'border-primary bg-primary/10' 
                          : 'border-gray-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selectedCuisines.includes(cuisine)}
                        onChange={() => handleCuisineToggle(cuisine)}
                      />
                      <span>{cuisine}</span>
                      {selectedCuisines.includes(cuisine) && (
                        <CheckCircle className="w-4 h-4 text-primary ml-auto" />
                      )}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4].map(price => (
                    <button
                      key={price}
                      className={`flex-1 py-2 border rounded-lg ${
                        price >= priceRange[0] && price <= priceRange[1]
                          ? 'border-primary bg-primary/10' 
                          : 'border-gray-200'
                      }`}
                      onClick={() => {
                        if (price === priceRange[0] && price === priceRange[1]) {
                          // If single item selected, clicking again expands selection
                          setPriceRange([1, 4]);
                        } else if (price < priceRange[0]) {
                          setPriceRange([price, priceRange[1]]);
                        } else if (price > priceRange[1]) {
                          setPriceRange([priceRange[0], price]);
                        } else if (price === priceRange[0]) {
                          setPriceRange([price + 1, priceRange[1]]);
                        } else if (price === priceRange[1]) {
                          setPriceRange([priceRange[0], price - 1]);
                        } else {
                          setPriceRange([price, price]);
                        }
                      }}
                    >
                      {'$'.repeat(price)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-3">Sort By</h3>
                <div className="space-y-2">
                  {[
                    { id: 'recommended', label: 'Recommended' },
                    { id: 'rating', label: 'Highest Rated' },
                    { id: 'delivery-time', label: 'Delivery Time' },
                    { id: 'price-low', label: 'Price: Low to High' },
                    { id: 'price-high', label: 'Price: High to Low' },
                  ].map(sort => (
                    <label 
                      key={sort.id}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                        sortBy === sort.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        className="sr-only"
                        checked={sortBy === sort.id}
                        onChange={() => setSortBy(sort.id)}
                      />
                      <span>{sort.label}</span>
                      {sortBy === sort.id && (
                        <CheckCircle className="w-4 h-4 text-primary ml-auto" />
                      )}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex mt-8 space-x-3">
                <button 
                  className="flex-1 py-2 border border-gray-300 rounded-lg"
                  onClick={clearFilters}
                >
                  Clear All
                </button>
                <button 
                  className="flex-1 py-2 bg-primary text-white rounded-lg"
                  onClick={applyFilters}
                >
                  Apply Filters
                </button>
              </div>
            </SheetContent>
          </Sheet>
          
          <div className="flex space-x-2">
            <button 
              className={`flex items-center text-sm px-3 py-1.5 rounded-full ${
                sortBy === 'price-low' 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-gray-100'
              }`}
              onClick={() => setSortBy('price-low')}
            >
              <ArrowDown className="w-3 h-3 mr-1" />
              Price
            </button>
            
            <button 
              className={`flex items-center text-sm px-3 py-1.5 rounded-full ${
                sortBy === 'rating' 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-gray-100'
              }`}
              onClick={() => setSortBy('rating')}
            >
              Rating
            </button>
            
            <button 
              className={`flex items-center text-sm px-3 py-1.5 rounded-full ${
                sortBy === 'delivery-time' 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-gray-100'
              }`}
              onClick={() => setSortBy('delivery-time')}
            >
              Time
            </button>
          </div>
        </div>
      </div>
      
      {query && (
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="text-sm text-gray-500">
            {sortedRestaurants.length} results for "{query}"
          </div>
        </div>
      )}
      
      {/* Recent Searches */}
      {!query && (
        <div className="p-4">
          <h2 className="font-medium mb-3">Recent Searches</h2>
          <div className="space-y-2">
            {['Pizza', 'Burger King', 'Sushi'].map((search, index) => (
              <div 
                key={index}
                className="flex items-center py-2 border-b border-gray-100 cursor-pointer"
                onClick={() => handleSearch(search)}
              >
                <div className="text-gray-500">{search}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Popular Searches */}
      {!query && (
        <div className="p-4 mt-2">
          <h2 className="font-medium mb-3">Popular Searches</h2>
          <div className="flex flex-wrap gap-2">
            {['Pizza', 'Burgers', 'Chinese', 'Italian', 'Mexican', 'Sushi', 'Dessert', 'Breakfast'].map((search, index) => (
              <button
                key={index}
                className="bg-gray-100 px-3 py-1.5 rounded-full text-sm"
                onClick={() => handleSearch(search)}
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Search Results */}
      {sortedRestaurants.length > 0 ? (
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {sortedRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      ) : query ? (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold mb-2">No results found</h2>
          <p className="text-gray-500 text-center mb-6">
            We couldn't find any restaurants matching "{query}"
          </p>
          <button 
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium"
            onClick={() => {
              setQuery('');
              navigate('/search');
            }}
          >
            Clear Search
          </button>
        </div>
      ) : null}
      
      <BottomNavigation />
    </div>
  );
};

export default SearchPage;
