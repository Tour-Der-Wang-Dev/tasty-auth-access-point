
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "../data/mockData";

type RestaurantCardProps = {
  restaurant: Restaurant;
  featured?: boolean;
};

const RestaurantCard = ({ restaurant, featured = false }: RestaurantCardProps) => {
  const navigate = useNavigate();

  return (
    <div 
      className={`rounded-lg overflow-hidden shadow-md bg-white ${
        featured ? "w-full" : "w-full"
      }`}
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
    >
      <div className="relative">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className={`w-full object-cover ${featured ? "h-40" : "h-32"}`}
        />
        {restaurant.promoted && (
          <div className="absolute top-2 left-2 bg-primary text-white text-xs font-medium px-2 py-1 rounded">
            Promoted
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800 truncate">{restaurant.name}</h3>
          <div className="flex items-center bg-green-100 px-1.5 py-0.5 rounded text-xs">
            <Star className="w-3 h-3 text-yellow-500 mr-0.5" />
            <span>{restaurant.rating}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm">{restaurant.cuisine}</p>
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>{restaurant.deliveryTime}</span>
          <span>{restaurant.deliveryFee}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
