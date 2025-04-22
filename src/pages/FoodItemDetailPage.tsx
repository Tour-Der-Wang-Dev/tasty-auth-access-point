
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { menuItems, customizations, restaurants, cartItems } from "../data/mockData";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const FoodItemDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const allMenuItems = Object.values(menuItems).flat();
  const menuItem = allMenuItems.find(item => item.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [specialInstructions, setSpecialInstructions] = useState("");
  
  const itemCustomizations = customizations[id || ''] || [];
  
  const restaurant = menuItem 
    ? restaurants.find(r => r.id === menuItem.restaurantId)
    : null;
  
  const handleOptionChange = (customizationId: string, optionId: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [customizationId]: optionId
    });
  };
  
  const calculateTotalPrice = () => {
    if (!menuItem) return 0;
    
    let total = menuItem.price;
    
    // Add customization prices
    Object.keys(selectedOptions).forEach(customizationId => {
      const optionId = selectedOptions[customizationId];
      const customization = itemCustomizations.find(c => c.id === customizationId);
      const option = customization?.options.find(o => o.id === optionId);
      
      if (option) {
        total += option.price;
      }
    });
    
    return total * quantity;
  };
  
  const handleAddToCart = () => {
    if (!menuItem) return;
    
    // Get selected customizations
    const selectedCustomizations = Object.keys(selectedOptions).map(customizationId => {
      const customization = itemCustomizations.find(c => c.id === customizationId);
      const option = customization?.options.find(o => o.id === selectedOptions[customizationId]);
      
      return {
        name: customization?.name || '',
        option: option?.name || '',
        price: option?.price || 0
      };
    });
    
    // Here you would normally dispatch to a cart context or state management
    // For now, we'll just navigate to the cart page
    
    toast({
      title: "Added to cart",
      description: `${quantity}× ${menuItem.name} added to your cart.`,
    });
    
    // Navigate back or to cart
    navigate(-1);
  };
  
  if (!menuItem || !restaurant) {
    return (
      <div className="p-4">
        <h2>Item not found</h2>
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
    <div className="min-h-screen bg-white pb-24">
      {/* Item Header */}
      <div className="relative h-64">
        <img 
          src={menuItem.image} 
          alt={menuItem.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 p-4">
          <button 
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Item Info */}
      <div className="px-4 py-4">
        <h1 className="text-2xl font-bold">{menuItem.name}</h1>
        <p className="text-gray-600 mt-2">{menuItem.description}</p>
        <div className="text-primary text-lg font-medium mt-2">
          ${menuItem.price.toFixed(2)}
        </div>
      </div>
      
      {/* Quantity Selector */}
      <div className="px-4 py-2 border-t border-b border-gray-100">
        <div className="flex justify-between items-center">
          <span className="font-medium">Quantity</span>
          <div className="flex items-center">
            <button
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="mx-3 w-6 text-center">{quantity}</span>
            <button
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Customizations */}
      {itemCustomizations.length > 0 && (
        <div className="px-4 py-4">
          {itemCustomizations.map(customization => (
            <div key={customization.id} className="mb-6">
              <h3 className="font-medium mb-3">{customization.name}</h3>
              <div className="space-y-2">
                {customization.options.map(option => (
                  <label key={option.id} className="flex items-center">
                    <input
                      type="radio"
                      name={customization.id}
                      checked={selectedOptions[customization.id] === option.id}
                      onChange={() => handleOptionChange(customization.id, option.id)}
                      className="mr-3"
                    />
                    <span>{option.name}</span>
                    {option.price > 0 && (
                      <span className="ml-auto text-gray-500">
                        +${option.price.toFixed(2)}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Special Instructions */}
      <div className="px-4 py-4 border-t border-gray-100">
        <h3 className="font-medium mb-3">Special Instructions</h3>
        <Textarea
          placeholder="Add special instructions here..."
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          className="w-full"
        />
      </div>
      
      {/* Similar Items */}
      <div className="px-4 py-4 border-t border-gray-100">
        <h3 className="font-medium mb-3">You might also like</h3>
        <div className="flex space-x-4 overflow-x-auto hide-scrollbar pb-2">
          {allMenuItems
            .filter(item => 
              item.restaurantId === menuItem.restaurantId && 
              item.id !== menuItem.id
            )
            .slice(0, 5)
            .map(item => (
              <div 
                key={item.id} 
                className="min-w-[140px] rounded-lg overflow-hidden shadow-sm border border-gray-100"
                onClick={() => navigate(`/food-item/${item.id}`)}
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-20 object-cover"
                />
                <div className="p-2">
                  <div className="font-medium text-sm truncate">{item.name}</div>
                  <div className="text-primary text-sm mt-1">${item.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
      
      {/* Add to cart button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold">Total</span>
          <span className="text-xl font-bold">${calculateTotalPrice().toFixed(2)}</span>
        </div>
        <button 
          className="w-full bg-primary text-white py-3 rounded-lg font-medium"
          onClick={handleAddToCart}
        >
          Add to Order
        </button>
      </div>
    </div>
  );
};

export default FoodItemDetailPage;
