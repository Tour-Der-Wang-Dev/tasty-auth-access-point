
import { Search, MapPin } from "lucide-react";

type SearchBarProps = {
  onSearch?: (query: string) => void;
  placeholder?: string;
  location?: string;
  onLocationClick?: () => void;
};

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search for restaurants or food...",
  location = "Current Location",
  onLocationClick
}: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('search') as HTMLInputElement;
    if (onSearch) {
      onSearch(input.value);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="search"
          name="search"
          placeholder={placeholder}
          className="w-full h-12 pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
        />
      </form>
      
      {location && (
        <div 
          className="flex items-center mt-2 text-sm text-gray-600 cursor-pointer"
          onClick={onLocationClick}
        >
          <MapPin className="h-4 w-4 text-primary mr-1" />
          <span className="truncate">{location}</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
