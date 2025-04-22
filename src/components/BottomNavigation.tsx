
import { Home, Search, Clock, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { icon: <Home className="w-6 h-6" />, label: "Home", path: "/" },
    { icon: <Search className="w-6 h-6" />, label: "Search", path: "/search" },
    { icon: <Clock className="w-6 h-6" />, label: "Orders", path: "/order-history" },
    { icon: <User className="w-6 h-6" />, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-10">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`flex flex-col items-center justify-center w-1/4 h-full ${
              path === item.path ? "text-primary" : "text-gray-500"
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
