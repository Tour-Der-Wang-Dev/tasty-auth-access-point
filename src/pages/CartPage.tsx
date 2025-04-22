
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { cartItems, restaurants, userProfile } from "../data/mockData";
import CartItem from "../components/CartItem";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const CartPage = () => {
  const navigate = useNavigate();
  
  const [items, setItems] = useState(cartItems);
  const [promoCode, setPromoCode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(userProfile.addresses[0]?.id || "");
  const [selectedPayment, setSelectedPayment] = useState(
    userProfile.paymentMethods.find(p => p.isDefault)?.id || ""
  );
  
  // Calculate totals
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const itemPrice = item.menuItem.price + 
        item.customizations.reduce((total, c) => total + c.price, 0);
      return sum + (itemPrice * item.quantity);
    }, 0);
  }, [items]);
  
  const deliveryFee = 2.99;
  const tax = subtotal * 0.0825; // 8.25% tax
  const total = subtotal + deliveryFee + tax;
  
  const restaurant = items.length > 0 
    ? restaurants.find(r => r.id === items[0].menuItem.restaurantId)
    : null;
  
  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const handleUpdateQuantity = (id: string, quantity: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };
  
  const handlePlaceOrder = () => {
    // Here you would normally dispatch to an order context or API
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedAddress) {
      toast({
        title: "Delivery address required",
        description: "Please select a delivery address",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedPayment) {
      toast({
        title: "Payment method required",
        description: "Please select a payment method",
        variant: "destructive"
      });
      return;
    }
    
    // Mock order creation
    const orderId = 'o' + Math.floor(Math.random() * 10000);
    
    // Navigate to confirmation
    navigate(`/order-confirmation/${orderId}`);
  };
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="flex items-center mb-4">
          <button 
            className="mr-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Cart</h1>
        </div>
        
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 text-center mb-6">
            Browse restaurants and add items to your cart
          </p>
          <button 
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium"
            onClick={() => navigate('/')}
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center">
          <button 
            className="mr-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Cart</h1>
        </div>
      </div>
      
      {/* Restaurant Info */}
      {restaurant && (
        <div className="bg-white p-4 mt-2 flex items-center">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-12 h-12 rounded-full object-cover mr-3"
          />
          <div>
            <h2 className="font-medium">{restaurant.name}</h2>
            <div className="text-sm text-gray-500">{restaurant.deliveryTime} delivery</div>
          </div>
          <button 
            className="ml-auto text-primary text-sm"
            onClick={() => navigate(`/restaurant/${restaurant.id}`)}
          >
            Add More
          </button>
        </div>
      )}
      
      {/* Cart Items */}
      <div className="bg-white p-4 mt-2">
        <h2 className="font-medium mb-3">Your Order</h2>
        <div>
          {items.map(item => (
            <CartItem 
              key={item.id} 
              item={item}
              onRemove={handleRemoveItem}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))}
        </div>
      </div>
      
      {/* Promo Code */}
      <div className="bg-white p-4 mt-2">
        <h2 className="font-medium mb-3">Promo Code</h2>
        <div className="flex">
          <Input
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 mr-2"
          />
          <button 
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={() => {
              toast({
                title: "Invalid code",
                description: "The promo code you entered is invalid or expired",
                variant: "destructive"
              });
            }}
          >
            Apply
          </button>
        </div>
      </div>
      
      {/* Delivery Address */}
      <div className="bg-white p-4 mt-2">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-medium">Delivery Address</h2>
          <button className="text-primary text-sm">Add New</button>
        </div>
        
        <div className="space-y-3">
          {userProfile.addresses.map(address => (
            <label key={address.id} className="flex items-start p-3 border rounded-lg cursor-pointer relative">
              <input
                type="radio"
                name="address"
                className="mt-1 mr-3"
                checked={selectedAddress === address.id}
                onChange={() => setSelectedAddress(address.id)}
              />
              <div>
                <div className="font-medium">Home</div>
                <div className="text-sm text-gray-500">{address.address}</div>
              </div>
              {selectedAddress === address.id && (
                <CheckCircle className="text-primary w-5 h-5 absolute right-3 top-3" />
              )}
            </label>
          ))}
        </div>
      </div>
      
      {/* Payment Method */}
      <div className="bg-white p-4 mt-2">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-medium">Payment Method</h2>
          <button 
            className="text-primary text-sm"
            onClick={() => navigate('/payment-methods')}
          >
            Add New
          </button>
        </div>
        
        <div className="space-y-3">
          {userProfile.paymentMethods.map(payment => (
            <label key={payment.id} className="flex items-center p-3 border rounded-lg cursor-pointer relative">
              <input
                type="radio"
                name="payment"
                className="mr-3"
                checked={selectedPayment === payment.id}
                onChange={() => setSelectedPayment(payment.id)}
              />
              <div className="flex items-center">
                <div className="font-medium">
                  {payment.type} •••• {payment.last4}
                </div>
                {payment.isDefault && (
                  <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">
                    Default
                  </span>
                )}
              </div>
              {selectedPayment === payment.id && (
                <CheckCircle className="text-primary w-5 h-5 absolute right-3" />
              )}
            </label>
          ))}
        </div>
      </div>
      
      {/* Order Summary */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold mt-3 pt-3 border-t">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        
        <button 
          className="w-full bg-primary text-white py-3 rounded-lg font-medium"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;
