
import { useState } from "react";
import { categories, restaurants } from "../data/mockData";
import BottomNavigation from "../components/BottomNavigation";
import CategoryList from "../components/CategoryList";
import RestaurantCard from "../components/RestaurantCard";
import SearchBar from "../components/SearchBar";
import SpecialOffers from "../components/SpecialOffers";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const featuredRestaurants = restaurants.filter(r => r.featured);
  
  const filteredRestaurants = selectedCategory 
    ? restaurants.filter(r => r.categories.some(c => 
        categories.find(cat => cat.id === selectedCategory)?.name === c
      ))
    : restaurants;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 shadow-sm">
        <SearchBar 
          onSearch={(query) => navigate(`/search?q=${query}`)}
          onLocationClick={() => {/* Open location modal */}}
        />
      </div>
      
      <div className="px-4 mt-4">
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <SpecialOffers />
        
        {featuredRestaurants.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Featured Restaurants</h2>
            <div className="space-y-4">
              {featuredRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} featured />
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">
            {selectedCategory 
              ? `${categories.find(c => c.id === selectedCategory)?.name} Restaurants` 
              : 'Nearby Restaurants'}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {filteredRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default HomePage;
