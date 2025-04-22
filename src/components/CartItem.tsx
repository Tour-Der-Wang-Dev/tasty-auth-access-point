
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "../data/mockData";

type CartItemProps = {
  item: CartItemType;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
};

const CartItem = ({ item, onRemove, onUpdateQuantity }: CartItemProps) => {
  const totalPrice = 
    (item.menuItem.price + 
     item.customizations.reduce((sum, c) => sum + c.price, 0)) * 
    item.quantity;
  
  return (
    <div className="border-b border-gray-100 py-4">
      <div className="flex justify-between">
        <div className="flex items-start">
          <div className="font-medium">{item.quantity}×</div>
          <div className="ml-2">
            <div className="font-medium">{item.menuItem.name}</div>
            {item.customizations.length > 0 && (
              <div className="text-sm text-gray-500 mt-1">
                {item.customizations.map((c, i) => (
                  <div key={i}>
                    {c.name}: {c.option} {c.price > 0 && `(+$${c.price.toFixed(2)})`}
                  </div>
                ))}
              </div>
            )}
            {item.specialInstructions && (
              <div className="text-sm text-gray-500 mt-1">
                <span className="italic">"{item.specialInstructions}"</span>
              </div>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="font-medium">${totalPrice.toFixed(2)}</div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center">
          <button
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
            onClick={() => item.quantity > 1 ? onUpdateQuantity(item.id, item.quantity - 1) : onRemove(item.id)}
          >
            {item.quantity > 1 ? <Minus className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
          </button>
          <span className="mx-3">{item.quantity}</span>
          <button
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <button
          className="text-red-500 text-sm flex items-center"
          onClick={() => onRemove(item.id)}
        >
          <Trash2 className="w-4 h-4 mr-1" /> Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
