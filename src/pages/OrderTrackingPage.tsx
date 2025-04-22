
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, MessageSquare } from "lucide-react";
import { orders, driver } from "../data/mockData";
import OrderProgressBar from "../components/OrderProgressBar";

const OrderTrackingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const order = orders.find(o => o.id === id);
  const [expandDetails, setExpandDetails] = useState(false);
  const [remainingTime, setRemainingTime] = useState(1500); // 25 minutes in seconds
  
  useEffect(() => {
    // Countdown timer
    if (order?.status !== 'delivered') {
      const timer = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 0) return 0;
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [order?.status]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  if (!order) {
    return (
      <div className="p-4">
        <h2>Order not found</h2>
        <button 
          className="mt-4 text-primary"
          onClick={() => navigate('/order-history')}
        >
          Go to order history
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center">
          <button 
            className="mr-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Order #{order.id}</h1>
        </div>
      </div>
      
      {/* Restaurant Info */}
      <div className="bg-white p-4 flex items-center">
        <img 
          src={order.restaurantImage} 
          alt={order.restaurantName} 
          className="w-12 h-12 rounded-full object-cover mr-3"
        />
        <div>
          <h2 className="font-medium">{order.restaurantName}</h2>
          <div className="text-sm text-gray-500">Order total: ${order.total.toFixed(2)}</div>
        </div>
      </div>
      
      {/* Order Progress */}
      <div className="bg-white p-4 mt-2">
        <h2 className="font-medium mb-4">Order Status</h2>
        <OrderProgressBar status={order.status} />
        
        {order.status !== 'delivered' && (
          <div className="mt-6 text-center">
            <div className="text-sm text-gray-500 mb-1">Estimated Arrival</div>
            <div className="text-2xl font-bold">{formatTime(remainingTime)}</div>
          </div>
        )}
      </div>
      
      {/* Driver Info */}
      {(order.status === 'on-the-way' || order.status === 'ready') && (
        <div className="bg-white p-4 mt-2">
          <h2 className="font-medium mb-3">Your Driver</h2>
          <div className="flex items-center">
            <img 
              src={driver.photo} 
              alt={driver.name} 
              className="w-14 h-14 rounded-full object-cover mr-3"
            />
            <div className="flex-1">
              <div className="font-medium">{driver.name}</div>
              <div className="text-sm text-gray-500">{driver.vehicle}</div>
              <div className="text-sm text-gray-500">License: {driver.licensePlate}</div>
            </div>
            <div className="flex space-x-2">
              <button className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </button>
              <button className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Map */}
      <div className="bg-white p-4 mt-2">
        <h2 className="font-medium mb-3">Delivery Location</h2>
        <div className="w-full h-48 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
          <div className="text-gray-400">Map View</div>
        </div>
        <div className="text-sm text-gray-600">
          {order.deliveryAddress}
        </div>
      </div>
      
      {/* Order Details */}
      <div className="bg-white p-4 mt-2">
        <button 
          className="flex justify-between items-center w-full"
          onClick={() => setExpandDetails(!expandDetails)}
        >
          <h2 className="font-medium">Order Details</h2>
          <span className="text-primary text-sm">
            {expandDetails ? 'Hide' : 'Show'}
          </span>
        </button>
        
        {expandDetails && (
          <div className="mt-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between py-2 border-t border-gray-100">
                <div>
                  <div className="font-medium">
                    {item.quantity}× {item.menuItem.name}
                  </div>
                  {item.customizations.length > 0 && (
                    <div className="text-sm text-gray-500">
                      {item.customizations.map((c, i) => (
                        <div key={i}>{c.name}: {c.option}</div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  ${((item.menuItem.price + item.customizations.reduce((sum, c) => sum + c.price, 0)) * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
            
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Delivery Fee</span>
                <span>${order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold mt-3 pt-3 border-t">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Support Button */}
      <div className="p-4 mt-4">
        <button className="w-full border border-gray-300 py-3 rounded-lg font-medium">
          Need Help?
        </button>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
