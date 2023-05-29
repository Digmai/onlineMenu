export interface IProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  totalWeight: number;
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

export type TRole = "customer" | "cook" | "bartender" | "waiter" | "admin";
export interface IUser {
  _id: string;
  name: string;
  username: string;
  password: string;
  role: TRole; //customer - дял скидки 10% | 25% | 50%
}
export interface VerifyTokenResponse {
  user: IUser;
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
  id: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: IUser;
  completedAt?: string;
}

export type OrderStatus = "New" | "Preparing" | "Completed" | "Cancelled";

export interface ITable {
  _id: string;
  owner: string;
  tableNumber: number;
  status: "available" | "unavailable";
}

export interface WebSocketMessage {
  type: string;
  payload: any;
}

export interface WebSocketNotification {
  message: string;
  type: "success" | "error";
}

export type ErrorResponse = {
  message: string;
  code: number;
};

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
export interface IOptions {
  value: number;
  label: string;
}
[];

export interface FormUserValues {
  name: string;
  username: string;
  password?: string;
  role: string;
  discount?: string;
  tables?: string[];
  workingDays?: string[];
}
