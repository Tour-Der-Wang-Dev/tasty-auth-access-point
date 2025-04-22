
import { useMemo } from "react";

type OrderStatus = 'placed' | 'preparing' | 'ready' | 'on-the-way' | 'delivered';

type OrderProgressBarProps = {
  status: OrderStatus;
};

const OrderProgressBar = ({ status }: OrderProgressBarProps) => {
  const statusOrder: OrderStatus[] = ['placed', 'preparing', 'ready', 'on-the-way', 'delivered'];
  
  const currentStep = useMemo(() => {
    return statusOrder.indexOf(status);
  }, [status]);

  const statusText = {
    placed: 'Order Placed',
    preparing: 'Preparing',
    ready: 'Ready for Pickup',
    'on-the-way': 'On the Way',
    delivered: 'Delivered'
  };

  return (
    <div className="w-full my-6">
      <div className="flex justify-between mb-2">
        {statusOrder.map((step, index) => (
          <div 
            key={step} 
            className={`flex flex-col items-center ${
              index === currentStep ? 'text-primary font-medium' : 
              index < currentStep ? 'text-gray-500' : 'text-gray-300'
            }`}
          >
            <div 
              className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${
                index <= currentStep ? 'bg-primary text-white' : 'bg-gray-200'
              }`}
            >
              {index < currentStep ? '✓' : index + 1}
            </div>
            <div className="text-xs text-center w-16">{statusText[step]}</div>
          </div>
        ))}
      </div>
      
      <div className="relative w-full h-2 bg-gray-200 rounded-full mt-2">
        {/* Progress line */}
        <div 
          className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${Math.min(100, (currentStep / (statusOrder.length - 1)) * 100)}%` }}
        ></div>
        
        {/* Progress dots */}
        {statusOrder.map((_, index) => (
          <div 
            key={index}
            className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 ${
              index <= currentStep ? 'bg-primary' : 'bg-gray-200'
            }`}
            style={{ left: `${(index / (statusOrder.length - 1)) * 100}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default OrderProgressBar;
