
import { Category } from "../data/mockData";

type CategoryListProps = {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
};

const CategoryList = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategoryListProps) => {
  return (
    <div className="flex space-x-4 overflow-x-auto pb-2 hide-scrollbar">
      <div 
        className={`flex flex-col items-center min-w-[60px] ${
          selectedCategory === null ? "text-primary" : "text-gray-500"
        }`}
        onClick={() => onSelectCategory(null)}
      >
        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl ${
          selectedCategory === null ? "bg-primary/20" : "bg-gray-100"
        }`}>
          🍽️
        </div>
        <span className="text-xs mt-1 text-center">All</span>
      </div>

      {categories.map((category) => (
        <div
          key={category.id}
          className={`flex flex-col items-center min-w-[60px] ${
            selectedCategory === category.id ? "text-primary" : "text-gray-500"
          }`}
          onClick={() => onSelectCategory(category.id)}
        >
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl ${
            selectedCategory === category.id ? "bg-primary/20" : "bg-gray-100"
          }`}>
            {category.icon}
          </div>
          <span className="text-xs mt-1 text-center truncate">{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
