
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { orders } from "../data/mockData";
import OrderCard from "../components/OrderCard";
import BottomNavigation from "../components/BottomNavigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  
  const statusFilters = [
    { label: 'All', value: null },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' }
  ];
  
  // Filter orders
  const filteredOrders = orders.filter(order => {
    // Apply search query
    if (searchQuery && !order.restaurantName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply status filter
    if (filterStatus === 'active' && order.status === 'delivered') {
      return false;
    }
    
    if (filterStatus === 'completed' && order.status !== 'delivered') {
      return false;
    }
    
    return true;
  });
  
  // Sort orders by date (newest first)
  const sortedOrders = [...filteredOrders].sort((a, b) => 
    new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-primary text-white p-6 pt-10">
        <h1 className="text-2xl font-bold">Order History</h1>
      </div>
      
      <div className="p-4">
        {/* Search */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-3 flex items-center">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Status Filters */}
        <div className="flex space-x-2 mb-4 overflow-x-auto hide-scrollbar pb-2">
          {statusFilters.map(filter => (
            <button
              key={filter.label}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filterStatus === filter.value 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}
              onClick={() => setFilterStatus(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        {/* Orders List */}
        {sortedOrders.length > 0 ? (
          <div>
            {sortedOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-xl font-semibold mb-2">No orders found</h2>
            <p className="text-gray-500 text-center mb-6">
              {searchQuery 
                ? `We couldn't find any orders matching "${searchQuery}"`
                : "You haven't placed any orders yet"}
            </p>
            <button 
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium"
              onClick={() => navigate('/')}
            >
              Browse Restaurants
            </button>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default OrderHistoryPage;
