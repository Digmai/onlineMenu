import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IProduct, Order, OrderStatus } from "../types";
import { AppThunk, AppDispatch, RootState } from "../store";
import ApiService from "../services/ApiService";
import { WebSocketNotification } from "../types";
import { OrderService } from "../services/OrderService";
import axios from "axios";

interface OrdersState {
  orders: Order[];
  cart: IProduct[];
  loading: boolean;
  totalPrice: number;
  error: string | null;
  notifications: WebSocketNotification[];
}

const initialState: OrdersState = {
  cart: [], //ожидает подтверждения
  orders: [], // в готовиться или выполнен
  error: null,
  totalPrice: 0,
  loading: false,
  notifications: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // Добавление товара в корзину заказа
    addItemToCart(state, action: PayloadAction<IProduct>) {
      state.cart = [...state.cart, action.payload];
      state.totalPrice += action.payload.price;
    },
    // Удаление товара из корзины заказа по индексу
    removeItemFromCart(state, action: PayloadAction<number>) {
      const removedItem = state.cart[action.payload];
      state.cart = state.cart.filter((_, index) => index !== action.payload);
      state.totalPrice -= removedItem.price;
    },
    // Очистка корзины заказа
    clearCart(state) {
      state.cart = [];
    },
    // Установка списка заказов в состояние
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
    // Установка статуса заказа по идентификатору заказа
    setOrderStatus(
      state,
      action: PayloadAction<{ orderId: string; status: OrderStatus }>
    ) {
      const orderIndex = state.orders.findIndex(
        (order) => order.id === action.payload.orderId
      );
      if (orderIndex !== -1) {
        state.orders[orderIndex].status = action.payload.status;
      }
    },
    // Добавление уведомления о WebSocket-событии в состояние
    addNotification(state, action: PayloadAction<WebSocketNotification>) {
      state.notifications = [action.payload, ...state.notifications];
    },
    // Удаление уведомления из состояния по тексту сообщения
    removeNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        (notif) => notif.message !== action.payload
      );
    },
    // Установка флага загрузки в состоянии
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    // Установка сообщения об ошибке в состоянии
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    // Очистка сообщения об ошибке в состоянии
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  setOrders,
  setOrderStatus,
  addNotification,
  removeNotification,
  setLoading,
  setError,
  clearError,
} = ordersSlice.actions;

export const checkout =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(setLoading(true));
      const cart = getState().orders.cart;
      const orderItems = cart.map((item) => ({ item, quantity: 1 }));
      const orderTotal = cart.reduce((total, item) => total + item.price, 0);
      const order = await OrderService.createOrder(orderItems, orderTotal);
      dispatch(clearCart());
      dispatch(fetchOrders());
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchOrders = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const orders = await ApiService.get<Order[]>("orders");
    dispatch(setOrders(orders.data));
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateOrderStatus =
  (orderId: string, status: OrderStatus): AppThunk =>
  async (dispatch) => {
    try {
      await OrderService.updateOrderStatus(orderId, status);
      dispatch(setOrderStatus({ orderId, status }));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

export const updateOrderStatus2 = createAsyncThunk(
  "orders/updateOrderStatus",
  async (payload: { orderId: string; status: OrderStatus }) => {
    const { orderId, status } = payload;
    await OrderService.updateOrderStatus(orderId, status);
    return payload;
  }
);

export const connectToWebSocket = () => async (dispatch: AppDispatch) => {
  // const socket =
  //   (await ApiService.getWebSocketConnection()) as unknown as WebSocket;
  // socket.onmessage = (event) => {
  //   const message = JSON.parse(event.data);
  //   if (message.type === "newOrder" && message.payload._id) {
  //     dispatch(
  //       addNotification({ type: "success", message: "New order received!" })
  //     );
  //     dispatch(fetchOrders());
  //   }
  // };
};

export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (order, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/orders", order);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const selectCarts = (state: RootState) => state.orders.cart;
export const selectOrders = (state: RootState) => state.orders.orders;
export const selectTotalPrice = (state: RootState) => state.orders.totalPrice;
export const selectLoading = createSelector(
  (state: RootState) => state.orders.loading,
  (loading) => loading
);
export const selectError = createSelector(
  (state: RootState) => state.orders.error,
  (error) => error
);

export default ordersSlice.reducer;
