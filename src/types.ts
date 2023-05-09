export interface IProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  subcategory: string;
  CookingTime: number;
  DishOrDrink: "Dish" | "Drink";
  ingredients: { name: string; weight: number }[];
}
export interface IProducts {
  [category: string]: {
    [subcategory: string]: IProduct[];
  };
}
export interface Drink {
  _id: string;
  name: string;
  ingredients: { name: string; weight: number }[];
  price: number;
  image: string;
  CookingTime: number;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "customer" | "cook" | "bartender" | "waiter" | "admin";
}
export interface VerifyTokenResponse {
  data: {
    user: IUser;
  };
}

export interface ILogin {
  email: string;
  password: string;
}

export interface OrderItem {
  item: IProduct;
  quantity: number;
}

export interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: IUser;
  completedAt?: string;
}

export type OrderStatus = "New" | "Preparing" | "Completed" | "Cancelled";

export interface WebSocketMessage {
  type: string;
  payload: any;
}

export interface WebSocketNotification {
  message: string;
  type: "success" | "error";
}
