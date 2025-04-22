
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Order } from "../data/mockData";

type OrderCardProps = {
  order: Order;
};

const OrderCard = ({ order }: OrderCardProps) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'placed': return 'bg-blue-100 text-blue-600';
      case 'preparing': return 'bg-yellow-100 text-yellow-600';
      case 'ready': return 'bg-orange-100 text-orange-600';
      case 'on-the-way': return 'bg-purple-100 text-purple-600';
      case 'delivered': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'placed': return 'Order Placed';
      case 'preparing': return 'Preparing';
      case 'ready': return 'Ready for Pickup';
      case 'on-the-way': return 'On the Way';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4"
      onClick={() => navigate(`/order-tracking/${order.id}`)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <img 
            src={order.restaurantImage} 
            alt={order.restaurantName} 
            className="w-12 h-12 rounded-full object-cover mr-3"
          />
          <div>
            <h3 className="font-medium">{order.restaurantName}</h3>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <Clock className="w-3 h-3 mr-1" />
              <span>{formatDate(order.orderDate)}</span>
            </div>
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
          {getStatusText(order.status)}
        </span>
      </div>
      
      <div className="border-t border-gray-100 pt-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            {order.items.reduce((total, item) => total + item.quantity, 0)} items
          </span>
          <span className="font-medium">${order.total.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between mt-3">
          <button 
            className="text-primary text-sm font-medium"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/order-tracking/${order.id}`);
            }}
          >
            Track Order
          </button>
          
          {order.status === 'delivered' && (
            <button 
              className="bg-primary/10 text-primary text-sm px-3 py-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                // Reorder logic
              }}
            >
              Reorder
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
