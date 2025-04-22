
import { useNavigate } from "react-router-dom";
import { MenuItem as MenuItemType } from "../data/mockData";

type MenuItemProps = {
  item: MenuItemType;
};

const MenuItem = ({ item }: MenuItemProps) => {
  const navigate = useNavigate();

  return (
    <div 
      className="flex border-b border-gray-100 py-3 cursor-pointer"
      onClick={() => navigate(`/food-item/${item.id}`)}
    >
      <div className="flex-1 mr-3">
        <div className="flex items-start">
          <h3 className="font-medium text-gray-800 truncate">{item.name}</h3>
          {item.popular && (
            <span className="ml-2 bg-red-100 text-red-700 text-xs px-1.5 rounded-sm">
              Popular
            </span>
          )}
        </div>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
        <div className="mt-2 text-primary font-medium">${item.price.toFixed(2)}</div>
      </div>
      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default MenuItem;
