
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Share, Check } from "lucide-react";
import OrderProgressBar from "../components/OrderProgressBar";
import { toast } from "@/hooks/use-toast";

const OrderConfirmationPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real app, you would fetch order details here
  const order = {
    id: id || 'unknown',
    estimatedDelivery: '30-40 minutes',
    status: 'placed' as const
  };
  
  useEffect(() => {
    // Show toast when component mounts
    toast({
      title: "Order placed successfully!",
      description: `Your order #${order.id} has been received.`,
    });
  }, []);
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Food Order',
        text: `I've just ordered food! Track my order #${order.id}.`,
        url: window.location.href,
      });
    } else {
      toast({
        title: "Sharing not supported",
        description: "Your browser doesn't support the share functionality",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center text-center shadow-sm mb-6">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <Check className="w-10 h-10 text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 mb-4">
          Your order has been received and is being processed.
        </p>
        
        <div className="bg-gray-50 w-full p-3 rounded-lg mb-6">
          <div className="text-sm text-gray-500 mb-1">Order Number</div>
          <div className="font-semibold">#{order.id}</div>
        </div>
        
        <div className="w-full mb-6">
          <div className="text-sm text-gray-500 mb-2">Estimated Delivery Time</div>
          <div className="text-xl font-semibold">{order.estimatedDelivery}</div>
        </div>
        
        <OrderProgressBar status={order.status} />
        
        <div className="grid grid-cols-2 gap-4 w-full mt-6">
          <button 
            className="bg-primary text-white py-3 px-4 rounded-lg font-medium"
            onClick={() => navigate(`/order-tracking/${order.id}`)}
          >
            Track Order
          </button>
          
          <button 
            className="border border-gray-300 py-3 px-4 rounded-lg font-medium flex items-center justify-center"
            onClick={handleShare}
          >
            <Share className="w-5 h-5 mr-2" />
            Share
          </button>
        </div>
      </div>
      
      <button 
        className="w-full py-3 text-primary font-medium"
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderConfirmationPage;
