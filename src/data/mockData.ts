
export type Restaurant = {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  featured?: boolean;
  promoted?: boolean;
  categories: string[];
  distance?: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  popular?: boolean;
  restaurantId: string;
  category: string;
};

export type Customization = {
  id: string;
  name: string;
  options: {
    id: string;
    name: string;
    price: number;
  }[];
};

export type CartItem = {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customizations: {
    name: string;
    option: string;
    price: number;
  }[];
  specialInstructions?: string;
};

export type Order = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: 'placed' | 'preparing' | 'ready' | 'on-the-way' | 'delivered';
  orderDate: string;
  deliveryAddress: string;
  estimatedDeliveryTime: string;
};

export type Driver = {
  id: string;
  name: string;
  photo: string;
  vehicle: string;
  licensePlate: string;
  phone: string;
};

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  addresses: { id: string; address: string; }[];
  paymentMethods: { id: string; type: string; last4: string; isDefault: boolean; }[];
  favoriteRestaurants: string[];
};

// Mock categories
export const categories: Category[] = [
  { id: '1', name: 'Pizza', icon: '🍕' },
  { id: '2', name: 'Burgers', icon: '🍔' },
  { id: '3', name: 'Sushi', icon: '🍣' },
  { id: '4', name: 'Mexican', icon: '🌮' },
  { id: '5', name: 'Italian', icon: '🍝' },
  { id: '6', name: 'Chinese', icon: '🥡' },
  { id: '7', name: 'Indian', icon: '🍛' },
  { id: '8', name: 'Thai', icon: '🍲' },
];

// Mock restaurants
export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Pizza Palace',
    image: 'https://picsum.photos/id/292/500/300',
    cuisine: 'Italian',
    rating: 4.5,
    deliveryTime: '20-30 min',
    deliveryFee: '$2.99',
    featured: true,
    promoted: true,
    categories: ['Pizza', 'Italian'],
    distance: '1.2 miles'
  },
  {
    id: '2',
    name: 'Burger Bay',
    image: 'https://picsum.photos/id/1060/500/300',
    cuisine: 'American',
    rating: 4.2,
    deliveryTime: '15-25 min',
    deliveryFee: '$1.99',
    featured: true,
    categories: ['Burgers', 'American'],
    distance: '0.8 miles'
  },
  {
    id: '3',
    name: 'Sushi Spot',
    image: 'https://picsum.photos/id/827/500/300',
    cuisine: 'Japanese',
    rating: 4.8,
    deliveryTime: '25-35 min',
    deliveryFee: '$3.99',
    categories: ['Sushi', 'Japanese'],
    distance: '2.0 miles'
  },
  {
    id: '4',
    name: 'Taco Time',
    image: 'https://picsum.photos/id/431/500/300',
    cuisine: 'Mexican',
    rating: 4.0,
    deliveryTime: '20-30 min',
    deliveryFee: '$2.49',
    promoted: true,
    categories: ['Mexican', 'Tacos'],
    distance: '1.5 miles'
  },
  {
    id: '5',
    name: 'Pasta Place',
    image: 'https://picsum.photos/id/315/500/300',
    cuisine: 'Italian',
    rating: 4.6,
    deliveryTime: '25-35 min',
    deliveryFee: '$3.49',
    categories: ['Italian', 'Pasta'],
    distance: '2.3 miles'
  },
  {
    id: '6',
    name: 'Wok & Roll',
    image: 'https://picsum.photos/id/163/500/300',
    cuisine: 'Chinese',
    rating: 4.3,
    deliveryTime: '20-30 min',
    deliveryFee: '$2.99',
    categories: ['Chinese', 'Asian'],
    distance: '1.8 miles'
  },
];

// Mock menu items
export const menuItems: Record<string, MenuItem[]> = {
  '1': [
    {
      id: '101',
      name: 'Margherita Pizza',
      description: 'Classic pizza with tomato sauce, mozzarella, and basil',
      price: 12.99,
      image: 'https://picsum.photos/id/149/500/300',
      popular: true,
      restaurantId: '1',
      category: 'Pizza'
    },
    {
      id: '102',
      name: 'Pepperoni Pizza',
      description: 'Pizza with tomato sauce, mozzarella, and pepperoni',
      price: 14.99,
      image: 'https://picsum.photos/id/187/500/300',
      popular: true,
      restaurantId: '1',
      category: 'Pizza'
    },
    {
      id: '103',
      name: 'Garlic Bread',
      description: 'Toasted bread with garlic butter and herbs',
      price: 5.99,
      image: 'https://picsum.photos/id/125/500/300',
      restaurantId: '1',
      category: 'Sides'
    },
    {
      id: '104',
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce with Caesar dressing and croutons',
      price: 7.99,
      image: 'https://picsum.photos/id/130/500/300',
      restaurantId: '1',
      category: 'Salads'
    },
  ],
  '2': [
    {
      id: '201',
      name: 'Classic Cheeseburger',
      description: 'Beef patty with cheese, lettuce, tomato, and special sauce',
      price: 9.99,
      image: 'https://picsum.photos/id/484/500/300',
      popular: true,
      restaurantId: '2',
      category: 'Burgers'
    },
    {
      id: '202',
      name: 'Double Bacon Burger',
      description: 'Two beef patties with bacon, cheese, and BBQ sauce',
      price: 13.99,
      image: 'https://picsum.photos/id/1008/500/300',
      popular: true,
      restaurantId: '2',
      category: 'Burgers'
    },
  ]
};

// Mock customizations
export const customizations: Record<string, Customization[]> = {
  '101': [
    {
      id: 'c1',
      name: 'Size',
      options: [
        { id: 'c1o1', name: 'Small', price: 0 },
        { id: 'c1o2', name: 'Medium', price: 2 },
        { id: 'c1o3', name: 'Large', price: 4 },
      ]
    },
    {
      id: 'c2',
      name: 'Crust',
      options: [
        { id: 'c2o1', name: 'Thin', price: 0 },
        { id: 'c2o2', name: 'Regular', price: 0 },
        { id: 'c2o3', name: 'Stuffed', price: 3 },
      ]
    },
    {
      id: 'c3',
      name: 'Extra Toppings',
      options: [
        { id: 'c3o1', name: 'Mushrooms', price: 1.5 },
        { id: 'c3o2', name: 'Olives', price: 1.5 },
        { id: 'c3o3', name: 'Extra Cheese', price: 2 },
      ]
    },
  ],
  '201': [
    {
      id: 'c4',
      name: 'Meat Doneness',
      options: [
        { id: 'c4o1', name: 'Medium Rare', price: 0 },
        { id: 'c4o2', name: 'Medium', price: 0 },
        { id: 'c4o3', name: 'Well Done', price: 0 },
      ]
    },
    {
      id: 'c5',
      name: 'Add-ons',
      options: [
        { id: 'c5o1', name: 'Extra Cheese', price: 1 },
        { id: 'c5o2', name: 'Avocado', price: 2 },
        { id: 'c5o3', name: 'Fried Egg', price: 1.5 },
      ]
    },
  ]
};

// Mock cart items
export const cartItems: CartItem[] = [
  {
    id: 'cart1',
    menuItem: menuItems['1'][0],
    quantity: 1,
    customizations: [
      { name: 'Size', option: 'Medium', price: 2 },
      { name: 'Crust', option: 'Thin', price: 0 },
    ],
    specialInstructions: 'Extra crispy, please.'
  },
  {
    id: 'cart2',
    menuItem: menuItems['1'][2],
    quantity: 2,
    customizations: [],
  }
];

// Mock orders
export const orders: Order[] = [
  {
    id: 'o1',
    restaurantId: '1',
    restaurantName: 'Pizza Palace',
    restaurantImage: 'https://picsum.photos/id/292/500/300',
    items: cartItems,
    subtotal: 24.97,
    deliveryFee: 2.99,
    tax: 2.50,
    total: 30.46,
    status: 'delivered',
    orderDate: '2023-09-10T18:30:00',
    deliveryAddress: '123 Main St, Apt 4B',
    estimatedDeliveryTime: '20-30 min'
  },
  {
    id: 'o2',
    restaurantId: '2',
    restaurantName: 'Burger Bay',
    restaurantImage: 'https://picsum.photos/id/1060/500/300',
    items: [
      {
        id: 'cart3',
        menuItem: menuItems['2'][0],
        quantity: 1,
        customizations: [
          { name: 'Add-ons', option: 'Extra Cheese', price: 1 },
        ],
      }
    ],
    subtotal: 10.99,
    deliveryFee: 1.99,
    tax: 1.10,
    total: 14.08,
    status: 'on-the-way',
    orderDate: '2023-09-15T19:45:00',
    deliveryAddress: '456 Oak Ave, Suite 7',
    estimatedDeliveryTime: '10-15 min'
  }
];

// Mock driver
export const driver: Driver = {
  id: 'd1',
  name: 'John Smith',
  photo: 'https://picsum.photos/id/1005/500/300',
  vehicle: 'Honda Civic (Red)',
  licensePlate: 'ABC 123',
  phone: '555-123-4567'
};

// Mock user profile
export const userProfile: UserProfile = {
  name: 'Alex Johnson',
  email: 'alex@example.com',
  phone: '555-987-6543',
  addresses: [
    { id: 'a1', address: '123 Main St, Apt 4B, New York, NY 10001' },
    { id: 'a2', address: '456 Oak Ave, Suite 7, New York, NY 10002' }
  ],
  paymentMethods: [
    { id: 'pm1', type: 'Visa', last4: '4242', isDefault: true },
    { id: 'pm2', type: 'Mastercard', last4: '5555', isDefault: false }
  ],
  favoriteRestaurants: ['1', '3']
};

// Mock special offers
export const specialOffers = [
  {
    id: 'offer1',
    restaurantId: '1',
    title: '20% OFF Your First Order',
    description: 'Use code WELCOME20',
    image: 'https://picsum.photos/id/399/800/400'
  },
  {
    id: 'offer2',
    restaurantId: '2',
    title: 'Free Delivery on Orders $15+',
    description: 'Limited time offer',
    image: 'https://picsum.photos/id/488/800/400'
  },
  {
    id: 'offer3',
    restaurantId: '3',
    title: 'Buy One Get One Free',
    description: 'On select sushi rolls',
    image: 'https://picsum.photos/id/365/800/400'
  }
];
