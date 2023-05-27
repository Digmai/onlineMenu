import ApiService from "./ApiService";
import { Order, OrderItem } from "../types";

class OrderService {
  static async createOrder(orderItems: OrderItem[], orderTotal: number) {
    try {
      const order = {
        items: orderItems,
        total: orderTotal,
      };
      const response = await ApiService.post("/orders", order);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getOrders(): Promise<Order[]> {
    try {
      const response = await ApiService.get<Order[]>("/orders/all");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateOrder(order: Order) {
    try {
      const response = await ApiService.put(
        `/orders/${order.id}/update`,
        order
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteOrder(id: string) {
    try {
      const response = await ApiService.delete(`/orders/${id}/delete`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async updateOrderStatus(orderId: string, status: string) {
    try {
      const response = await ApiService.put(`/orders/${orderId}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export { OrderService };
