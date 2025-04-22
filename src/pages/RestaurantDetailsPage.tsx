
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, Star } from "lucide-react";
import { restaurants, menuItems } from "../data/mockData";
import MenuItem from "../components/MenuItem";

const RestaurantDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  
  const restaurant = restaurants.find(r => r.id === id);
  const menu = menuItems[id || ''] || [];
  
  // Group menu items by category
  const menuByCategory = menu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof menu>);
  
  const categories = Object.keys(menuByCategory);
  
  const [activeCategory, setActiveCategory] = useState(categories.length > 0 ? categories[0] : '');
  
  if (!restaurant) {
    return (
      <div className="p-4">
        <h2>Restaurant not found</h2>
        <button 
          className="mt-4 text-primary"
          onClick={() => navigate('/')}
        >
          Go back to home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Restaurant Header */}
      <div className="relative h-56">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <button 
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
              onClick={() => setFavorite(!favorite)}
            >
              <Heart className={`w-5 h-5 ${favorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Restaurant Info */}
      <div className="px-4 -mt-6 relative">
        <div className="bg-white rounded-t-2xl pt-4 px-2">
          <h1 className="text-2xl font-bold">{restaurant.name}</h1>
          
          <div className="flex flex-wrap mt-2 text-sm text-gray-500">
            <span className="mr-2">{restaurant.cuisine}</span>
            <span className="mr-2">•</span>
            <span className="flex items-center mr-2">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              {restaurant.rating}
            </span>
            <span className="mr-2">•</span>
            <span>{restaurant.distance}</span>
          </div>
          
          <div className="flex mt-2 text-sm">
            <div className="bg-gray-100 px-2 py-1 rounded mr-2">
              {restaurant.deliveryTime}
            </div>
            <div className="bg-gray-100 px-2 py-1 rounded">
              {restaurant.deliveryFee} delivery
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu Categories */}
      <div className="border-b border-gray-200 mt-4 sticky top-0 bg-white z-10">
        <div className="flex overflow-x-auto hide-scrollbar px-4">
          {categories.map(category => (
            <button
              key={category}
              className={`whitespace-nowrap px-4 py-3 text-sm font-medium ${
                activeCategory === category 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold my-3">{activeCategory}</h2>
        <div className="space-y-1">
          {menuByCategory[activeCategory]?.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      
      {/* Reviews Preview */}
      <div className="px-4 py-6 border-t border-gray-100 mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Reviews</h2>
          <button className="text-primary text-sm font-medium">See All</button>
        </div>
        
        {/* Sample Review */}
        <div className="mt-3 bg-gray-50 p-3 rounded-lg">
          <div className="flex justify-between">
            <div className="font-medium">John D.</div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-sm">4.5</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Great food, quick delivery. The pizza was hot and delicious!
          </p>
        </div>
      </div>
      
      {/* Add to cart floating button */}
      {menu.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4">
          <button 
            className="w-full bg-primary text-white py-3 rounded-lg font-medium shadow-md"
            onClick={() => navigate('/cart')}
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailsPage;
