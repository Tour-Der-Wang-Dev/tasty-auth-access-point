
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, LogOut, Bell, Heart, Clock, Settings } from "lucide-react";
import { userProfile } from "../data/mockData";
import BottomNavigation from "../components/BottomNavigation";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user] = useState(userProfile);
  
  const menuItems = [
    { 
      icon: <Heart className="text-red-500" />, 
      title: 'Favorite Restaurants', 
      action: () => navigate('/favorites') 
    },
    { 
      icon: <Clock className="text-blue-500" />, 
      title: 'Order History', 
      action: () => navigate('/order-history') 
    },
    { 
      icon: <Settings className="text-gray-500" />, 
      title: 'App Settings', 
      action: () => {} 
    },
  ];
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    // In a real app, you would clear authentication state
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-primary text-white p-6 pt-10">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>
      
      {/* User Info */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
            {/* User avatar would go here */}
            <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary font-bold text-xl">
              {user.name.charAt(0)}
            </div>
          </div>
          
          <div className="ml-4 flex-1">
            <h2 className="font-semibold text-lg">{user.name}</h2>
            <div className="text-gray-500 text-sm">{user.email}</div>
            <div className="text-gray-500 text-sm">{user.phone}</div>
          </div>
          
          <button 
            className="text-primary text-sm"
            onClick={() => toast({
              title: "Coming soon",
              description: "Profile editing will be available soon.",
            })}
          >
            Edit
          </button>
        </div>
      </div>
      
      {/* Addresses */}
      <div className="bg-white mt-4 p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-medium">Saved Addresses</h2>
          <button 
            className="text-primary text-sm"
            onClick={() => toast({
              title: "Coming soon",
              description: "Address management will be available soon.",
            })}
          >
            Add New
          </button>
        </div>
        
        {user.addresses.map((address) => (
          <div key={address.id} className="py-3 border-t border-gray-100">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">Home</div>
                <div className="text-sm text-gray-500">{address.address}</div>
              </div>
              <button className="text-gray-400">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Payment Methods */}
      <div className="bg-white mt-4 p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-medium">Payment Methods</h2>
          <button 
            className="text-primary text-sm"
            onClick={() => navigate('/payment-methods')}
          >
            Add New
          </button>
        </div>
        
        {user.paymentMethods.map((payment) => (
          <div key={payment.id} className="py-3 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">
                  {payment.type} •••• {payment.last4}
                  {payment.isDefault && (
                    <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">
                      Default
                    </span>
                  )}
                </div>
              </div>
              <button className="text-gray-400">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Menu Items */}
      <div className="bg-white mt-4">
        {menuItems.map((item, index) => (
          <button 
            key={index}
            className="flex items-center justify-between w-full p-4 border-b border-gray-100"
            onClick={item.action}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 mr-3">
                {item.icon}
              </div>
              <span>{item.title}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>
      
      {/* Notifications */}
      <div className="bg-white mt-4 p-4">
        <h2 className="font-medium mb-3">Notifications</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 mr-3">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <span>Push Notifications</span>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 mr-3">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <span>Email Notifications</span>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 mr-3">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <span>SMS Notifications</span>
            </div>
            <Switch />
          </div>
        </div>
      </div>
      
      {/* Logout Button */}
      <div className="p-4 mt-2">
        <button 
          className="flex items-center justify-center w-full py-3 text-red-500 font-medium"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </button>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ProfilePage;
