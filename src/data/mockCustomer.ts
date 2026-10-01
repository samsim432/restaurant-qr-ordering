import type {
  CustomerSession,
  FoodItem,
} from "../types/customer";

/* =========================================================
   RESTAURANT SESSION
========================================================= */

export const restaurantSession: CustomerSession = {
  business: {
    id: "himalayan-kitchen",
    name: "Himalayan Kitchen",
    type: "restaurant",
    description: "Authentic Nepali food",
  },

  location: {
    tableNumber: "12",
  },
};

/* =========================================================
   IMAGE LIBRARY
========================================================= */

const foodImages = {
  Momo: [
    "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=900&q=85",
  ],

  Noodles: [
    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=85",
  ],

  Nepali: [
    "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=85",
  ],

  Curries: [
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=85",
  ],

  Rice: [
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&w=900&q=85",
  ],

  Starters: [
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=900&q=85",
  ],

  Drinks: [
    "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85",
  ],

  Desserts: [
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
  ],
};

/* =========================================================
   IMAGE HELPER
========================================================= */

function imagesFor(category: string): string[] {
  return (
    foodImages[
      category as keyof typeof foodImages
    ] ?? foodImages.Nepali
  );
}

/* =========================================================
   POPULAR FOODS
========================================================= */

export const popularFoods: FoodItem[] = [
  {
    id: "chicken-momo",
    name: "Chicken Momo",
    description:
      "Steamed dumplings filled with seasoned chicken and served with house achar",
    price: 220,
    category: "Momo",
    popular: true,
    images: imagesFor("Momo"),
  },

  {
    id: "buff-momo",
    name: "Buff Momo",
    description:
      "Juicy steamed dumplings filled with seasoned buff and Nepali spices",
    price: 200,
    category: "Momo",
    popular: true,
    images: imagesFor("Momo"),
  },

  {
    id: "veg-momo",
    name: "Veg Momo",
    description:
      "Steamed dumplings filled with fresh vegetables and herbs",
    price: 180,
    category: "Momo",
    popular: true,
    images: imagesFor("Momo"),
  },

  {
    id: "jhol-momo",
    name: "Jhol Momo",
    description:
      "Steamed chicken momos served in a rich, spicy sesame and tomato broth",
    price: 260,
    category: "Momo",
    popular: true,
    images: imagesFor("Momo"),
  },

  {
    id: "chicken-chowmein",
    name: "Chicken Chowmein",
    description:
      "Wok-tossed noodles with chicken, cabbage, carrots and spring onions",
    price: 260,
    category: "Noodles",
    popular: true,
    images: imagesFor("Noodles"),
  },

  {
    id: "buff-chowmein",
    name: "Buff Chowmein",
    description:
      "Nepali-style wok-fried noodles with seasoned buff and vegetables",
    price: 250,
    category: "Noodles",
    popular: true,
    images: imagesFor("Noodles"),
  },

  {
    id: "veg-chowmein",
    name: "Veg Chowmein",
    description:
      "Wok-fried noodles with fresh seasonal vegetables and house sauce",
    price: 210,
    category: "Noodles",
    popular: true,
    images: imagesFor("Noodles"),
  },

  {
    id: "chicken-thakali-set",
    name: "Chicken Thakali Set",
    description:
      "Traditional Nepali set with steamed rice, dal, chicken curry, tarkari, achar and greens",
    price: 450,
    category: "Nepali",
    popular: true,
    images: imagesFor("Nepali"),
  },

  {
    id: "mutton-thakali-set",
    name: "Mutton Thakali Set",
    description:
      "Traditional Thakali platter with mutton curry, rice, dal, vegetables and achar",
    price: 550,
    category: "Nepali",
    popular: true,
    images: imagesFor("Nepali"),
  },

  {
    id: "veg-thakali-set",
    name: "Veg Thakali Set",
    description:
      "Traditional vegetarian Nepali set with rice, dal, seasonal tarkari and achar",
    price: 350,
    category: "Nepali",
    popular: true,
    images: imagesFor("Nepali"),
  },

  {
    id: "chicken-biryani",
    name: "Chicken Biryani",
    description:
      "Fragrant basmati rice cooked with spiced chicken and aromatic herbs",
    price: 380,
    category: "Rice",
    popular: true,
    images: imagesFor("Rice"),
  },

  {
    id: "butter-chicken",
    name: "Butter Chicken",
    description:
      "Tender chicken cooked in a creamy tomato and butter sauce",
    price: 420,
    category: "Curries",
    popular: true,
    images: imagesFor("Curries"),
  },

  {
    id: "chicken-curry",
    name: "Nepali Chicken Curry",
    description:
      "Traditional chicken curry cooked with onions, tomatoes and Nepali spices",
    price: 400,
    category: "Curries",
    popular: true,
    images: imagesFor("Curries"),
  },

  {
    id: "mutton-curry",
    name: "Mutton Curry",
    description:
      "Slow-cooked mutton in a rich Nepali-style spiced gravy",
    price: 480,
    category: "Curries",
    popular: true,
    images: imagesFor("Curries"),
  },

  {
    id: "lassi",
    name: "Mango Lassi",
    description:
      "Refreshing creamy yogurt drink blended with ripe mango",
    price: 150,
    category: "Drinks",
    popular: true,
    images: imagesFor("Drinks"),
  },
];

/* =========================================================
   MENU
========================================================= */

const rawMenuFoods: FoodItem[] = [
  // MOMO
  {
    id: "chicken-momo",
    name: "Chicken Momo",
    description:
      "Steamed dumplings filled with seasoned chicken and house achar",
    price: 220,
    category: "Momo",
    popular: true,
  },
  {
    id: "buff-momo",
    name: "Buff Momo",
    description:
      "Juicy steamed dumplings filled with seasoned buff and Nepali spices",
    price: 200,
    category: "Momo",
    popular: true,
  },
  {
    id: "veg-momo",
    name: "Veg Momo",
    description:
      "Steamed dumplings filled with fresh vegetables and herbs",
    price: 180,
    category: "Momo",
    popular: true,
  },
  {
    id: "fried-chicken-momo",
    name: "Fried Chicken Momo",
    description:
      "Crispy pan-fried chicken momos served with spicy tomato achar",
    price: 240,
    category: "Momo",
  },
  {
    id: "fried-buff-momo",
    name: "Fried Buff Momo",
    description:
      "Crispy fried buff dumplings with house-made achar",
    price: 220,
    category: "Momo",
  },
  {
    id: "jhol-momo",
    name: "Jhol Momo",
    description:
      "Chicken momos served in a spicy sesame, tomato and coriander broth",
    price: 260,
    category: "Momo",
    popular: true,
  },
  {
    id: "chilli-momo",
    name: "Chilli Momo",
    description:
      "Crispy chicken momos tossed with onions, peppers and chilli sauce",
    price: 280,
    category: "Momo",
  },

  // NOODLES
  {
    id: "chicken-chowmein",
    name: "Chicken Chowmein",
    description:
      "Wok-tossed noodles with chicken and fresh vegetables",
    price: 260,
    category: "Noodles",
    popular: true,
  },
  {
    id: "buff-chowmein",
    name: "Buff Chowmein",
    description:
      "Wok-fried noodles with seasoned buff and vegetables",
    price: 250,
    category: "Noodles",
  },
  {
    id: "veg-chowmein",
    name: "Veg Chowmein",
    description:
      "Wok-fried noodles with cabbage, carrots, peppers and spring onions",
    price: 210,
    category: "Noodles",
  },
  {
    id: "mixed-chowmein",
    name: "Mixed Chowmein",
    description:
      "Chicken, buff, egg and vegetables tossed with noodles",
    price: 320,
    category: "Noodles",
  },
  {
    id: "chicken-thukpa",
    name: "Chicken Thukpa",
    description:
      "Warm Himalayan noodle soup with chicken, vegetables and herbs",
    price: 280,
    category: "Noodles",
    popular: true,
  },
  {
    id: "veg-thukpa",
    name: "Veg Thukpa",
    description:
      "Himalayan noodle soup with fresh vegetables and aromatic broth",
    price: 230,
    category: "Noodles",
  },
  {
    id: "mixed-thukpa",
    name: "Mixed Thukpa",
    description:
      "Hearty noodle soup with chicken, egg and seasonal vegetables",
    price: 320,
    category: "Noodles",
  },

  // NEPALI
  {
    id: "chicken-thakali-set",
    name: "Chicken Thakali Set",
    description:
      "Rice, dal, chicken curry, tarkari, greens and traditional achar",
    price: 450,
    category: "Nepali",
    popular: true,
  },
  {
    id: "mutton-thakali-set",
    name: "Mutton Thakali Set",
    description:
      "Mutton curry served with rice, dal, vegetables, greens and achar",
    price: 550,
    category: "Nepali",
    popular: true,
  },
  {
    id: "veg-thakali-set",
    name: "Veg Thakali Set",
    description:
      "Rice, dal, seasonal vegetables, greens and Nepali achar",
    price: 350,
    category: "Nepali",
  },
  {
    id: "dal-bhat",
    name: "Dal Bhat Tarkari",
    description:
      "Classic Nepali meal with steamed rice, lentil soup, vegetables and achar",
    price: 320,
    category: "Nepali",
    popular: true,
  },
  {
    id: "gundruk-dal",
    name: "Gundruk Dal",
    description:
      "Traditional fermented leafy greens cooked with lentils and Nepali spices",
    price: 280,
    category: "Nepali",
  },
  {
    id: "aloo-tama",
    name: "Aloo Tama",
    description:
      "Traditional Nepali bamboo shoot and potato curry",
    price: 280,
    category: "Nepali",
  },
  {
    id: "sel-roti",
    name: "Sel Roti",
    description:
      "Traditional crispy Nepali rice bread served with achar",
    price: 160,
    category: "Nepali",
  },

  // CURRIES
  {
    id: "chicken-curry",
    name: "Nepali Chicken Curry",
    description:
      "Tender chicken cooked with onions, tomatoes and traditional Nepali spices",
    price: 400,
    category: "Curries",
    popular: true,
  },
  {
    id: "butter-chicken",
    name: "Butter Chicken",
    description:
      "Tender chicken in a creamy tomato, butter and spice sauce",
    price: 420,
    category: "Curries",
    popular: true,
  },
  {
    id: "mutton-curry",
    name: "Mutton Curry",
    description:
      "Slow-cooked mutton in a rich Nepali-style spiced gravy",
    price: 480,
    category: "Curries",
    popular: true,
  },
  {
    id: "paneer-curry",
    name: "Paneer Curry",
    description:
      "Indian cottage cheese cooked in a rich tomato and onion gravy",
    price: 360,
    category: "Curries",
  },
  {
    id: "dal-tadka",
    name: "Dal Tadka",
    description:
      "Yellow lentils tempered with garlic, cumin and aromatic spices",
    price: 220,
    category: "Curries",
  },
  {
    id: "chana-masala",
    name: "Chana Masala",
    description:
      "Chickpeas cooked in a rich tomato, onion and spice gravy",
    price: 260,
    category: "Curries",
  },

  // RICE
  {
    id: "plain-rice",
    name: "Steamed Rice",
    description:
      "Freshly steamed long-grain rice",
    price: 120,
    category: "Rice",
  },
  {
    id: "jeera-rice",
    name: "Jeera Rice",
    description:
      "Fragrant basmati rice cooked with cumin seeds",
    price: 180,
    category: "Rice",
  },
  {
    id: "chicken-biryani",
    name: "Chicken Biryani",
    description:
      "Aromatic basmati rice layered with spiced chicken and herbs",
    price: 380,
    category: "Rice",
    popular: true,
  },
  {
    id: "mutton-biryani",
    name: "Mutton Biryani",
    description:
      "Fragrant basmati rice cooked with tender spiced mutton",
    price: 480,
    category: "Rice",
  },
  {
    id: "chicken-fried-rice",
    name: "Chicken Fried Rice",
    description:
      "Wok-fried rice with chicken, egg, vegetables and spring onions",
    price: 280,
    category: "Rice",
  },
  {
    id: "veg-fried-rice",
    name: "Veg Fried Rice",
    description:
      "Wok-fried rice with seasonal vegetables and house seasoning",
    price: 220,
    category: "Rice",
  },

  // STARTERS
  {
    id: "chicken-sekuwa",
    name: "Chicken Sekuwa",
    description:
      "Char-grilled Nepali-style chicken skewers marinated in herbs and spices",
    price: 350,
    category: "Starters",
    popular: true,
  },
  {
    id: "buff-sekuwa",
    name: "Buff Sekuwa",
    description:
      "Traditional Nepali grilled buff skewers with smoky spices",
    price: 380,
    category: "Starters",
  },
  {
    id: "chicken-chilli",
    name: "Chicken Chilli",
    description:
      "Crispy chicken tossed with peppers, onions and spicy chilli sauce",
    price: 360,
    category: "Starters",
  },
  {
    id: "paneer-chilli",
    name: "Paneer Chilli",
    description:
      "Crispy paneer cubes tossed with peppers, onions and chilli sauce",
    price: 320,
    category: "Starters",
  },
  {
    id: "french-fries",
    name: "French Fries",
    description:
      "Crispy golden fries served with tomato ketchup",
    price: 180,
    category: "Starters",
  },
  {
    id: "chilli-fries",
    name: "Chilli Fries",
    description:
      "Crispy fries tossed with chilli, garlic and spring onions",
    price: 220,
    category: "Starters",
  },

  // DRINKS
  {
    id: "mango-lassi",
    name: "Mango Lassi",
    description:
      "Creamy yogurt drink blended with ripe mango",
    price: 150,
    category: "Drinks",
    popular: true,
  },
  {
    id: "sweet-lassi",
    name: "Sweet Lassi",
    description:
      "Refreshing chilled yogurt drink lightly sweetened",
    price: 120,
    category: "Drinks",
  },
  {
    id: "salted-lassi",
    name: "Salted Lassi",
    description:
      "Chilled yogurt drink with Himalayan salt and roasted cumin",
    price: 120,
    category: "Drinks",
  },
  {
    id: "masala-tea",
    name: "Masala Chiya",
    description:
      "Traditional Nepali milk tea brewed with aromatic spices",
    price: 100,
    category: "Drinks",
    popular: true,
  },
  {
    id: "black-tea",
    name: "Black Tea",
    description:
      "Freshly brewed black tea",
    price: 80,
    category: "Drinks",
  },
  {
    id: "lemon-tea",
    name: "Lemon Tea",
    description:
      "Refreshing black tea with fresh lemon",
    price: 100,
    category: "Drinks",
  },
  {
    id: "milk-coffee",
    name: "Milk Coffee",
    description:
      "Smooth hot coffee with steamed milk",
    price: 140,
    category: "Drinks",
  },
  {
    id: "coke",
    name: "Coca-Cola",
    description:
      "Chilled Coca-Cola",
    price: 100,
    category: "Drinks",
  },
  {
    id: "sprite",
    name: "Sprite",
    description:
      "Chilled lemon-lime soft drink",
    price: 100,
    category: "Drinks",
  },
  {
    id: "mineral-water",
    name: "Mineral Water",
    description:
      "Chilled bottled drinking water",
    price: 50,
    category: "Drinks",
  },

  // DESSERTS
  {
    id: "kheer",
    name: "Rice Kheer",
    description:
      "Traditional Nepali rice pudding cooked with milk, cardamom and nuts",
    price: 160,
    category: "Desserts",
    popular: true,
  },
  {
    id: "gulab-jamun",
    name: "Gulab Jamun",
    description:
      "Soft milk dumplings soaked in warm cardamom sugar syrup",
    price: 150,
    category: "Desserts",
  },
  {
    id: "ice-cream",
    name: "Vanilla Ice Cream",
    description:
      "Creamy vanilla ice cream",
    price: 140,
    category: "Desserts",
  },
  {
    id: "mango-ice-cream",
    name: "Mango Ice Cream",
    description:
      "Smooth and creamy mango ice cream",
    price: 160,
    category: "Desserts",
  },
];

/* =========================================================
   ADD 3 IMAGES TO EVERY FOOD
========================================================= */

export const menuFoods: FoodItem[] =
  rawMenuFoods.map((food) => ({
    ...food,
    images: imagesFor(food.category),
  }));