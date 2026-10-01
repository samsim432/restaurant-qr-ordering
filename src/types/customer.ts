export type BusinessType = "restaurant" | "hotel";

export type PaymentMethod =
  | "esewa"
  | "khalti"
  | "card"
  | "counter";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

export interface Business {
  id: string;
  name: string;
  type: BusinessType;
  logo?: string;
  description?: string;
}

export interface TableContext {
  tableNumber?: string;
  roomNumber?: string;
}

export interface CustomerSession {
  business: Business;
  location: TableContext;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;

  // Main/legacy image support
  image?: string;

  // Multiple food images
  images?: string[];

  category: string;
  popular?: boolean;
}

export interface CartItem {
  food: FoodItem;
  quantity: number;
  note?: string;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  business: Business;
  location: TableContext;
  items: CartItem[];
  paymentMethod: PaymentMethod;
  paymentStatus: "pending" | "paid" | "unpaid";
  status: OrderStatus;
  subtotal: number;
  serviceCharge: number;
  total: number;
  createdAt: string;
}